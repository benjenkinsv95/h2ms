package edu.harvard.h2ms.controllers;

import static edu.harvard.h2ms.common.TestHelpers.obtainAccessToken;
import static java.lang.Boolean.TRUE;
import static java.util.Arrays.asList;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.harvard.h2ms.common.TestHelpers;
import edu.harvard.h2ms.domain.core.*;
import edu.harvard.h2ms.repository.*;
import java.util.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@SpringBootTest
public class UserControllerTests {

  private static final Log log = LogFactory.getLog(UserControllerTests.class);

  static final String EMAIL = "jqadams@h2ms.org";
  static final String PASSWORD = "password";
  static final String CONTENT_TYPE = "application/json;charset=UTF-8";

  @Autowired private FilterChainProxy springSecurityFilterChain;

  @Autowired private WebApplicationContext context;

  private MockMvc mvc;

  @Autowired UserRepository userRepository;

  @Autowired RoleRepository roleRepository;

  @Autowired QuestionRepository questionRepository;

  @Autowired EventTemplateRepository eventTemplateRepository;

  @Autowired EventRepository eventRepository;

  private Question booleanQuestion;
  private Question optionsQuestion;

  /**
   * Setup prior to running unit tests
   *
   * @throws Exception
   */
  @Before
  public void setup() throws Exception {
    MockitoAnnotations.initMocks(this);
    this.mvc =
        MockMvcBuilders.webAppContextSetup(context).addFilter(springSecurityFilterChain).build();

    // Sample User Data
    User observer = new User("John", "Quincy", "Adams", EMAIL, PASSWORD, "Other");
    Role role = roleRepository.findByName("ROLE_ADMIN");
    observer.setRoles(new HashSet<Role>(Arrays.asList(role)));
    userRepository.save(observer);
    User subject = new User("Jane", "Doe", "Sam", "sample@email.com", "password", "Doctor");
    userRepository.save(subject);

    // Creates and persists event
    Event event = new Event();
    Set<Answer> answers = new HashSet<>();
    Answer answer = new Answer();

    booleanQuestion = new Question();
    booleanQuestion.setPriority(1);
    booleanQuestion.setRequired(TRUE);
    booleanQuestion.setAnswerType("boolean");
    booleanQuestion.setQuestion("Washed?");
    booleanQuestion.setEventTemplate(eventTemplateRepository.findByName("Handwashing Event"));

    optionsQuestion = new Question();
    optionsQuestion.setPriority(2);
    optionsQuestion.setRequired(false);
    optionsQuestion.setAnswerType("options");
    optionsQuestion.setQuestion("Relative moment");
    optionsQuestion.setOptions(asList("entering", "exiting"));
    optionsQuestion.setEventTemplate(eventTemplateRepository.findByName("Handwashing Event"));

    answer.setQuestion(booleanQuestion);
    answer.setValue("true");
    answers.add(answer);
    event.setAnswers(answers);
    event.setLocation("Location_01");
    event.setSubject(subject);
    event.setObserver(observer);
    event.setEventTemplate(eventTemplateRepository.findByName("Handwashing Event"));
    event.setObserver(observer);
    event.setTimestamp(new Date(System.currentTimeMillis()));
    eventRepository.save(event);
  }

  /**
   * Tests the success of the /users/compliance/{question_id} endpoint. The endpoint is used to
   * retrieve the compliance value for a particular question
   */
  @Test
  @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
  public void test_Success_UserController_findUserCompliance() throws Exception {

    final String accessToken = obtainAccessToken(mvc, "jqadams@h2ms.org", "password");

    // Makes API calls and checks for success status
    MockHttpServletResponse result =
        mvc.perform(
                get(String.format("/users/compliance/%d", booleanQuestion.getId()))
                    .header("Authorization", "Bearer " + accessToken)
                    .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse();

    Map<String, Double> mapResult = TestHelpers.getDoubleMap(result.getContentAsString());

    assertThat(mapResult.get("Doctor"), is(1.0));
    assertThat(mapResult.get("Other"), is(0.0));
  }

  /**
   * Tests the failure of the /users/compliance/{question_id} endpoint when a question isn't found.
   */
  @Test
  @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
  public void test_NotFound_UserController_findUserCompliance() throws Exception {

    final String accessToken = obtainAccessToken(mvc, "jqadams@h2ms.org", "password");

    mvc.perform(
            get("/users/compliance/0")
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());
  }

  /**
   * Tests the failure of the /users/compliance/{question_id} endpoint when compliance is generated
   * for a non-boolean end point.
   */
  @Test
  @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
  public void test_BadRequest_UserController_findUserCompliance() throws Exception {

    final String accessToken = obtainAccessToken(mvc, "jqadams@h2ms.org", "password");

    mvc.perform(
            get(String.format("/users/compliance/%d", optionsQuestion.getId()))
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest());
  }

  @Test
  @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
  public void test_nonAdminRequest_UserController_saveNewUser() throws Exception {

    User user = new User("John", "Middle", "Doe", "john_doe@gmail.com", "password123", "user_type");
    ObjectMapper mapper = new ObjectMapper();
    String jsonStr = mapper.writeValueAsString(user);
    final String accessToken = obtainAccessToken(mvc, "sample@email.com", "password");

    mvc.perform(
            MockMvcRequestBuilders.post("/users/")
                .content(jsonStr)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isForbidden()); // 403 Forbidden You don't have permission to access ..
  }

  @Test
  @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
  public void test_AdminRequest_UserController_saveNewUser() throws Exception {

    User user =
        new User("John", "Middle", "Doe", "john_doe_test@gmail.com", "password123", "user_type");
    Role role = roleRepository.findByName("ROLE_USER");
    // user.setRoles(new HashSet<Role>(asList(role)));
    user.setId(10L);
    user.setCreatedOn(null);
    user.setEnabled(TRUE);
    user.setVerified(TRUE);
    ObjectMapper mapper = new ObjectMapper();
    String jsonStr = mapper.writeValueAsString(user);
    final String accessToken = obtainAccessToken(mvc, "jqadams@h2ms.org", "password");

    mvc.perform(
            MockMvcRequestBuilders.post("/users/")
                .content(jsonStr)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
  }

  // Verifies system admin has role of ADMIN
  @Test
  @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
  public void test_AdminUserHasAdminRole() {
    User user = userRepository.findByLastName("User");
    Set<Role> roles = user.getRoles();
    Boolean hasRole = false;
    for (Role role : roles) {
      if (role.getName().contains("ROLE_ADMIN")) {
        hasRole = true;
      }
    }
    Assert.assertEquals(hasRole, TRUE);
  }
}
