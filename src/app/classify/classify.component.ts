import { Component, OnInit } from '@angular/core';
import { HorizonApiService } from '../Services/horizon-api.service';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {

  articles : any[] = [];
  categories : any[] = [];
  selected; 
  indexSelected;
  message;

  fClassify = new FormGroup({});

  titleGroup = new FormGroup({
    'title' : new FormControl('', [Validators.required])
  })

  get title(){
    return this.titleGroup.get('title');
  }

  categoryGroup = new FormGroup({
    'category' : new FormControl('', [Validators.required])
  });

  get category(){
    return this.categoryGroup.get('category');
  }
  
  constructor(private horizonApi : HorizonApiService) { }

  ngOnInit() {
    this.horizonApi.getUnclassified()
    .subscribe((response)=>{
      this.articles = response.json();
    });

    this.horizonApi.getCategories()
    .subscribe((response)=>{
      this.categories = response.json();
    })
  }

  openLink(link){
    window.open(link,'popup','width=1200,height=700,scrollbars=no,resizable=no');  
  }

  selectArticle(article){
    this.indexSelected = this.articles.indexOf(article);
    this.selected = article;
    this.title.setValue(this.selected.Titre);
  }

  classify(){
    this.selected.Categorie = this.category.value;
    this.horizonApi.classification(this.selected)
    .subscribe((response)=>{
      console.log(response.json());
      this.message = response.json();
      setTimeout(()=>{this.message = ''}, 5000);
      this.articles.splice(this.indexSelected, 1);
      this.title.markAsUntouched();
      this.title.setValue('');
      this.category.markAsUntouched();
      this.category.setValue('');
    })
  }

}
