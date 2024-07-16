import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {ArticleInterface} from '../types/article.interface'
import {ArticleResponseInterface} from '../types/articleResponse.interface'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `http://localhost:3000/api/article/${slug}`
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response) => response.article))
  }

}
