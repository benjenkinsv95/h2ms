import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {NAV_ITEMS} from '../app-routing.module';
import {NavItem} from '../nav-item';
import {ConfigService} from '../config.service';
import {Config} from '../config';

@Component({
    selector: 'app-nav-list',
    templateUrl: './nav-list.component.html',
    styleUrls: ['./nav-list.component.css']
})
/**
 * The NavListComponent lists the navigation menu items for the app. It is based on the following:
 * https://stackblitz.com/angular/ngjvmobekyl?file=app%2Fsidenav-responsive-example.css
 */
export class NavListComponent implements OnDestroy {

    mobileQuery: MediaQueryList;
    navItems: NavItem[];
    config: Config;

    private _mobileQueryListener: () => void;

    constructor(private changeDetectorRef: ChangeDetectorRef,
                private media: MediaMatcher,
                private location: Location,
                private configService: ConfigService) {
        this.config = configService.getConfig();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.navItems = NAV_ITEMS;
        for (const navItem of this.navItems) {
            navItem.showSubItems = navItem.isCurrentlySelected(location.path());
        }

    }

    isInProduction() {
        return window.location.hostname === 'www.h2ms.org';
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    switchConfigFile() {
        this.configService.toggleConfig();
    }
}
