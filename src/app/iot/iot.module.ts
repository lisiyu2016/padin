import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgxTooltipModule } from '../components/ngx-tooltip/ngx-tooltip.module';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IotRequestsService } from '@app/iot/iot-requests.service';
import { iotModuleReducersGenerator } from '@app/iot/iot-module.reducers';
import { IotCommonService } from '@app/iot/iot-common.service';
import { IotMockService } from '@app/iot/iot-mocks.service';
import { IotMockInterceptor } from '@app/iot/iot-mock.interceptor';
import { ProjectsComponent } from '@app/iot/projects/projects.component';
import { ActivityWidgetComponent } from '@app/iot/activity/activity-widget/activity-widget.component';
import { LocationsComponent } from '@app/iot/locations/locations.component';
import { ActivityComponent } from '@app/iot/activity/activity.component';
import { LocationRowComponent } from '@app/iot/locations/location-row/location-row.component';
import { LocationSingleComponent } from '@app/iot/locations/location-single/location-single.component';
import { SwitchWidgetsComponent } from '@app/iot/switch-widgets/switch-widgets.component';
import { PlacesComponent } from '@app/iot/places/places.component';
import { ProjectSingleComponent } from '@app/iot/project-single/project-single.component';
import { DocsComponent } from '@app/iot/docs/docs.component';
import { DocsApiWorkaroundComponent } from '@app/iot/docs/docs-api-workaround/docs-api-workaround.component';
import { ProjectGeneralInformationComponent } from '@app/iot/project-general-information/project-general-information.component';
import { ProjectTemperatureComponent } from '@app/iot/project-temperature/project-temperature.component';
import { ProjectLampComponent } from '@app/iot/project-lamp/project-lamp.component';
import { ProjectCO2Component } from '@app/iot/project-co2/project-co2.component';
import { ProjectHumidityComponent } from '@app/iot/project-humidity/project-humidity.component';
import { ActivitiesComponent } from '@app/iot/widgets/activities/activities.component';
import { HistoryStatisticsComponent } from '@app/iot/widgets/history-statistics/history-statistics.component';
import { DailyStatisticsComponent } from '@app/iot/widgets/daily-statistics/daily-statistics.component';
import { SendingInformationHttpsComponent } from '@app/iot/docs/sending-information-https/sending-information-https.component';
import { ProjectEventsActionsComponent } from '@app/iot/project-events-actions/project-events-actions.component';
import { ExperimentalComponent } from '@app/iot/experimental/experimental.component';
import { GpsComponent } from '@app/iot/gps/gps.component';
import { D3neComponent } from '@app/iot/d3ne/d3ne.component';
import { LampCardComponent } from '@app/iot/widgets/lamp-card//lamp-card.component';
import { HumidityComponent } from '@app/iot/widgets/humidity/humidity.component';
import { CO2WidgetComponent } from '@app/iot/widgets/co2-widget/co2-widget.component';
import { RestfulComponent } from '@app/iot/docs/restful/restful.component';
import { WaterBubbleComponent } from '@app/iot/water-bubble/water-bubble.component';
import { Co2Component } from '@app/iot/co2/co2.component';
import { IfExperimentalComponent } from '@app/components/if-experimental/if-experimental.component';
import { NgMediaModule } from '@app/ng-media';
import { IfNotEnglishComponent } from '@app/iot/if-not-english/if-not-english.component';
import { RealtimeDocumentModule } from 'realtime-document';
import { IconWidgetsComponent } from '@app/iot/index/icon-widgets/icon-widgets.component';
import { IndexComponent } from '@app/iot/index/index.component';
import { StatisticsComponent } from '@app/iot/statistics/statistics.component';
import { RealtimeService } from '@app/iot/realtime.service';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { Ng5BasicModule } from '@app/ng5-basic/ng5-basic.module';
import { KanaBetaComponent } from './widgets/kana-beta/kana-beta.component';
import { UserService } from '@app/services/user.service';
import { ProjectOpenbmcComponent } from './project-openbmc/project-openbmc.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule.forRoot(),
    NgxTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    UiSwitchModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    iotModuleReducersGenerator(),
    NgMediaModule,
    RealtimeDocumentModule,
    Ng5BasicModule,
  ],
  providers: [
    IotCommonService,
    IotMockService,
    RealtimeService,
    IotRequestsService,
    !environment.targetAPI ? { provide: HTTP_INTERCEPTORS, useClass: IotMockInterceptor, multi: true } : [],
  ],
  declarations: [
    StatisticsComponent,
    IndexComponent,
    IconWidgetsComponent,
    IfNotEnglishComponent,
    ExperimentalComponent,
    DocsApiWorkaroundComponent,
    ProjectSingleComponent,
    DailyStatisticsComponent,
    ProjectsComponent,
    LampCardComponent,
    KanaBetaComponent,
    HumidityComponent,
    ActivityWidgetComponent,
    LocationsComponent,
    ActivityComponent,
    ProjectGeneralInformationComponent,
    LocationRowComponent,
    LocationSingleComponent,
    ProjectTemperatureComponent,
    ProjectLampComponent,
    ProjectCO2Component,
    ProjectHumidityComponent,
    SwitchWidgetsComponent,
    PlacesComponent,
    DocsComponent,
    ProjectsComponent,
    CO2WidgetComponent,
    LocationsComponent,
    ActivitiesComponent,
    HistoryStatisticsComponent,
    SendingInformationHttpsComponent,
    ProjectEventsActionsComponent,
    GpsComponent,
    D3neComponent,
    RestfulComponent,
    WaterBubbleComponent,
    Co2Component,
    IfExperimentalComponent,
    ProjectOpenbmcComponent,
  ]
})
export class IotModule {
  constructor(
    private realtime: RealtimeService,
    private user: UserService,
  ) {
    this.realtime.ActivateRealtime();
  }
}
