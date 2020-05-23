import { TestBed } from '@angular/core/testing';

import { ContadorEvaluacionService } from './contador-evaluacion.service';

describe('ContadorEvaluacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContadorEvaluacionService = TestBed.get(ContadorEvaluacionService);
    expect(service).toBeTruthy();
  });
});
