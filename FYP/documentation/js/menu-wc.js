'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">fyp documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' : 'data-bs-target="#xs-components-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' :
                                            'id="xs-components-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' }>
                                            <li class="link">
                                                <a href="components/AboutusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountControllComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountControllComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountSettingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountSettingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContacusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContacusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CurrentOrdersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrentOrdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EarningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EarningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgetPinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgetPinComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GigInfoUploadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GigInfoUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GigManageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GigManageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GigPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GigPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GigPricingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GigPricingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderBeforeLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderBeforeLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistoryordersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoryordersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeAfterLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeAfterLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeassageManageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeassageManageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrefrencesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrefrencesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacypolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacypolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfessionDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfessionDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileSettingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileSettingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileTeacherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileTeacherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingTeacherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingTeacherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SigninComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SigninComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateGigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateGigComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateProffesionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateProffesionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' : 'data-bs-target="#xs-directives-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' :
                                        'id="xs-directives-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' }>
                                        <li class="link">
                                            <a href="directives/ClickOutsideDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickOutsideDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' : 'data-bs-target="#xs-pipes-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' :
                                            'id="xs-pipes-links-module-AppModule-8cf38df9d139a4e8a3c0654d5d0baf84bfff11caf800f8a5ca81ec52da1d2ae8545495bd7b3a5de9c3c704fc418bc01157e05f5a11f2506665c23f25ab9660e2"' }>
                                            <li class="link">
                                                <a href="pipes/SafeResourceUrlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafeResourceUrlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/ClickOutsideDirective-1.html" data-type="entity-link" >ClickOutsideDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeocodingService.html" data-type="entity-link" >GeocodingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseService.html" data-type="entity-link" >ParseService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/StudentNamesResolver.html" data-type="entity-link" >StudentNamesResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/GeocodeResponse.html" data-type="entity-link" >GeocodeResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});