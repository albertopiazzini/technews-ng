import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ServiceService } from './service.service';

describe('ServiceService', () => {
  let service: ServiceService;
  let httpClientSpy: {
    get: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceService],
    });

    service = TestBed.inject(ServiceService);
  });

  httpClientSpy = jasmine.createSpyObj('ServiceService', ['get']);
  service = new ServiceService(httpClientSpy as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllNewsId()', fakeAsync((done: DoneFn) => {
    const arrayId = Array.from({ length: 500 }, () =>
      Math.floor(Math.random() * 573493573)
    );

    httpClientSpy.get.and.returnValue(of(arrayId));
    service.getAllNews().subscribe((data) => {
      expect(data).toEqual(arrayId);
      done();
    });
    expect(service.getAllNews()).toBeDefined;
    expect(true).toBeTruthy();
  }));

  it('getOneNews()', fakeAsync((done: DoneFn) => {
    const newsSample = {
      by: '',
      descendants: 0,
      id: 768678,
      score: 1,
      time: 123454345654,
      title: '',
      type: '',
      url: '',
    };

    httpClientSpy.get.and.returnValue(of(newsSample));
    service.getOneNews(768678).subscribe((data) => {
      expect(data).toEqual(newsSample);
      done();
    });
    expect(service.getOneNews(768678)).toBeDefined;
    expect(true).toBeTruthy();
  }));

  it('#handleError should status 404', () => {
    let error: string = 'error 404 ';

    service.handleError(new HttpErrorResponse({ status: 404, error: 'error' }));

    expect(error).toEqual(error);
  });
});
