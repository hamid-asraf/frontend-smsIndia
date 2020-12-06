import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-data',
  templateUrl: './save-data.component.html',
  styleUrls: ['./save-data.component.css']
})
export class SaveDataComponent implements OnInit {

  constructor(private http: HttpService,  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    let crntId = this.route.snapshot.paramMap.get('id');
    if(crntId && !isNaN(parseInt(crntId))){
      this.pageTitle = "Update Record";
      this.getSelectedRecord(crntId);
    }
  }

  pageTitle = "Add New Record";
  error = true;
  message = null;
  currentData : any ={ city: "",
  start_date: "",
  end_date: "",
  price: "",
  status: "",
  color: ""
  }


  getSelectedRecord = (id) => {
    this.http.get("data/"+ id).subscribe(data => {
      this.currentData = data;
    }, error => {
       console.log("error---", error)
    })
  }


  saveData = () => {
    let meThod = "post"
    if(this.currentData && this.currentData["id"] && !isNaN(parseInt(this.currentData["id"]))){
      meThod = "put";
    }
    this.http[meThod]("data", this.currentData).subscribe(res => {
      if(res && res["status"]){
        this.message = res["message"];
        this.error = false;
      }else{
        this.message = res["message"];
        this.error = true;
      }

    }, error => {
      this.message = error["message"];
      this.error = true;

    })

    setTimeout(()=> {
      this.message = null;
      this.error = true;
    }, 3000)
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}

}
