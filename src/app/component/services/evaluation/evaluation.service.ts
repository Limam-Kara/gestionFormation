import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Evaluation } from 'src/app/modeles/evaluation';
import { QReponse } from 'src/app/modeles/qreponse';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private baseUrl = environment.baseUrl + 'evaluations';
  constructor(private http: HttpClient) {}

  addEvaluation(
    userId: number,
    thematiqueId: number,
    responses: string[]
  ): Observable<Evaluation> {
    const params = {
      userId: userId.toString(),
      thematiqueId: thematiqueId.toString(),
    };
    return this.http.post<Evaluation>(`${this.baseUrl}/add`, responses, {
      params,
    });
  }

  getResponses(evaluationId: number): Observable<QReponse[]> {
    return this.http.get<QReponse[]>(
      `${this.baseUrl}/${evaluationId}/responses`
    );
  }
  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.baseUrl}/evaluations`);
  }
}
