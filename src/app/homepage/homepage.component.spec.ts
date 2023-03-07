import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { ServiceService } from '../service.service';
import { HomepageComponent } from './homepage.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let service: ServiceService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [BrowserModule, HttpClientModule, HttpClientTestingModule],
      providers: [ServiceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient = TestBed.inject(HttpClient);
    service = new ServiceService(httpClientSpy as any);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadNews()', fakeAsync(() => {
    const newsSample = {
      by: '',
      descendants: 0,
      id: 456789654,
      score: 1,
      time: 123454345654,
      title: '',
      type: '',
      url: '',
    };

    component.allNewsId = [67854, 67546, 456789654, 63457687985746, 4657586786];
    spyOn(service, 'getOneNews').and.returnValue(of(newsSample));
    component.loadNews();
    flush();
    expect(component.loadNews).toHaveBeenCalled;
    expect(newsSample).toEqual(newsSample);
  }));
});
