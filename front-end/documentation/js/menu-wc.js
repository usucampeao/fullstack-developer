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
                    <a href="index.html" data-type="index-link">usucampeao-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-81b78b70dc55a2b0460627ea7233a054"' : 'data-target="#xs-components-links-module-AppModule-81b78b70dc55a2b0460627ea7233a054"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-81b78b70dc55a2b0460627ea7233a054"' :
                                            'id="xs-components-links-module-AppModule-81b78b70dc55a2b0460627ea7233a054"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConsultaModule.html" data-type="entity-link">ConsultaModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConsultaRoutingModule.html" data-type="entity-link">ConsultaRoutingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConsultaRoutingModule-efae0aa4c5484d4fce2095261180e806"' : 'data-target="#xs-components-links-module-ConsultaRoutingModule-efae0aa4c5484d4fce2095261180e806"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConsultaRoutingModule-efae0aa4c5484d4fce2095261180e806"' :
                                            'id="xs-components-links-module-ConsultaRoutingModule-efae0aa4c5484d4fce2095261180e806"' }>
                                            <li class="link">
                                                <a href="components/ConsultaImoveisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConsultaImoveisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FormsModule.html" data-type="entity-link">FormsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FormsRoutingModule.html" data-type="entity-link">FormsRoutingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FormsRoutingModule-c9c8230c214672067acafd642a91d5be"' : 'data-target="#xs-components-links-module-FormsRoutingModule-c9c8230c214672067acafd642a91d5be"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FormsRoutingModule-c9c8230c214672067acafd642a91d5be"' :
                                            'id="xs-components-links-module-FormsRoutingModule-c9c8230c214672067acafd642a91d5be"' }>
                                            <li class="link">
                                                <a href="components/CadastrarImovelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CadastrarImovelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-08f584e3dbcacbd7a241ef8317d8c3d5"' : 'data-target="#xs-components-links-module-SharedModule-08f584e3dbcacbd7a241ef8317d8c3d5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-08f584e3dbcacbd7a241ef8317d8c3d5"' :
                                            'id="xs-components-links-module-SharedModule-08f584e3dbcacbd7a241ef8317d8c3d5"' }>
                                            <li class="link">
                                                <a href="components/AccountCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatConfirmDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatConfirmDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuDropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuDropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AccountCardComponent.html" data-type="entity-link">AccountCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CadastrarImovelComponent.html" data-type="entity-link">CadastrarImovelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConsultaImoveisComponent.html" data-type="entity-link">ConsultaImoveisComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainLayoutComponent.html" data-type="entity-link">MainLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainNavComponent.html" data-type="entity-link">MainNavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToolbarComponent.html" data-type="entity-link">ToolbarComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link">MyErrorStateMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CepService.html" data-type="entity-link">CepService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonHelper.html" data-type="entity-link">CommonHelper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link">DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImovelService.html" data-type="entity-link">ImovelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemingService.html" data-type="entity-link">ThemingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link">AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Imovel.html" data-type="entity-link">Imovel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuRoute.html" data-type="entity-link">MenuRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Settings.html" data-type="entity-link">Settings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});