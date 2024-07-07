import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {PopularTagType} from '../../../types/popularTag.type'
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface'

@Injectable({
  providedIn: 'root'
})
export class PopularTagService {
  constructor(private http: HttpClient) {
  }

  getPopularTags() : Observable<PopularTagType[]>{
    const url =  'http://localhost:3000/api/tags'
    return this.http.get<GetPopularTagsResponseInterface>(url).pipe(map(response => response.tags))
  }
}
