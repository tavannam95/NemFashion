import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {RatingService} from '../../../shared/service/rating/rating.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

export class RatingComponent implements OnInit {
  array: any[] = [] ;
  displayedColumns: string[] = ['select' ,'image', 'content' , 'action'];
  dataSource : any ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<any>(true, [] );
  listImageRating: any ;


  constructor( private ratingService: RatingService ,
               private toast: ToastrService ) {
      this.getAllRating() ;
  }

  getAllRating(){
     return this.ratingService.getRatings().subscribe( (data:any) => {
         this.dataSource = new MatTableDataSource<any>(data);
         this.isAllSelected() ;
         this.getAllRatingImage(data);
     })
  }

  getAllRatingImage( data: any ) {
      return this.ratingService.getRatingsImage(  data).subscribe( value => {
          console.log( 'rating Image', value)
          this.listImageRating = value ;
      })
  }

  takeListImage( id: number ){
      let arr: any[] = [];
      for( let x of this.listImageRating ){
          if( id == x.rating.id ){
              arr.push(x)
          }
      }
      return arr ;
  }

  approveRating(){
      // this.toast.
      this.ratingService.updateRating( this.array ).subscribe( {
           next: () => {
               this.toast.success("Duệt thành công");
               this.array = [] ;
               this.getAllRating() ;
           },
          error: () => {
              this.toast.error("Duệt thất bại");
          }
      }) ;
  }

  deleteRating(){
      this.ratingService.deleteRating( this.array ).subscribe( {
          next: () => {
              this.toast.success("Xóa thành công");
              this.array = [] ;
              this.getAllRating() ;
          },
          error: () => {
              this.toast.error("Xóa thất bại");
          }
      })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
    console.log('toggleAllrow')
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    if( this.selection.isSelected(row) && this.checkExit(row) ){
      this.array.push(row)
      console.log('success' , this.array)
    } else {
       if( this.selection.isSelected(row) == false && this.checkExit(row) == false ){
         this.array = this.array.filter( x => x.id != row.id )
         console.log('error' , this.array)
       }
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  checkExit( row: any ){
     for( let x of this.array ){
        if( x.id == row.id){
            return false
        }
     }
     return true ;
  }

}
