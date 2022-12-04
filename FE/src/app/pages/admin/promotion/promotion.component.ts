import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {PromotionFormComponent} from './promotion-form/promotion-form.component';
import {Constant} from '../../../shared/constants/Constant';
import {PromotionProductComponent} from './promotion-product/promotion-product.component';
import {PromotionService} from '../../../shared/service/promotion/promotion.service';

@Component({
  selector: 'promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  displayedColumns: string[] = ['name', 'discount', 'startDate', 'endDate'
      , 'status', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  CONSTRANT = Constant.TYPE_DIALOG ;

  constructor( private dialog: MatDialog ,
               private promotionService: PromotionService ) {
  }

  ngOnInit(): void {
     this.getAll() ;
  }

  getAll() {
     this.promotionService.findAll().subscribe( (value:any) => {
       this.dataSource = new MatTableDataSource<any>(value)
       this.dataSource.paginator = this.paginator;
     })
  }

  onOpenForm( type: any , row?: any ){
    const ref = this.dialog.open( PromotionFormComponent , {
      width: '50vw' ,
      hasBackdrop: true ,
      disableClose: true ,
      autoFocus: false ,
      data: {
        type: type,
        data: row
      }
    })

    ref.afterClosed().subscribe( value => {
        if( value == Constant.RESULT_CLOSE_DIALOG.SUCCESS ){
            this.getAll() ;
        }
    })
  }

  onAddProduct( id: any){
    const ref = this.dialog.open( PromotionProductComponent , {
        width: '75vw' ,
        hasBackdrop: true ,
        disableClose: true ,
        autoFocus: false ,
        data: {
            idDis: id
        }
    })

    ref.afterClosed().subscribe( value => {

    })
  }

}

