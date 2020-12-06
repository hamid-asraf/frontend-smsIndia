import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getData();
  }
  currentData:any = [];
  originalData:any=[];
  sortBy: string = null;
  searchByStartDate = "";
  searchByEndDate = "";
  

  getData = () => {
     this.http.get("data").subscribe(data => {
       this.currentData = data;
       this.originalData = data;
     }, error => {
        console.log("error---", error)
     })
  }


  deleteData = (currentRecord, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover ${currentRecord["city"]} data!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.http.delete('data/'+currentRecord["id"]).subscribe(res => {
          if(res && res["status"]){
            Swal.fire(
              'Deleted!',
              res["message"],
              'success'
            )
            this.currentData.splice(index, 1);
          }

        },error => {
          Swal.fire(
            'Error',
            error.message,
            'error'
          )

        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `${currentRecord["city"]} is save :)`,
          'error'
        )
      }
    })
  }

  filterByDateRange = () => {

    if(!this.searchByStartDate || !this.searchByEndDate){
      this.currentData = this.originalData;
      return;
  }


    let start = new Date(this.searchByStartDate);
    let end   = new Date(this.searchByEndDate);
        
    let newData = this.currentData.filter(item => {
       let dateStart = new Date(item.start_date);
       let dateEnd = new Date(item.end_date);
       return dateStart <= start && dateEnd <= end;
    });
    this.currentData = newData;
  }

}
