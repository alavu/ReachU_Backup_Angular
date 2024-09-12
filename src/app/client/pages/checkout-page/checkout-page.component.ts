// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ClientService } from '../../services/client.service';
// import { MatDialog } from '@angular/material/dialog';
// import { NzModalService } from 'ng-zorro-antd/modal';
// import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-checkout-page',
//   templateUrl: './checkout-page.component.html',
//   styleUrls: ['./checkout-page.component.scss']
// })
// export class CheckoutPageComponent implements OnInit {
//   validateForm!: FormGroup;
//   ads: any[] = [];
//   selectedAddress: any = null;
//   addressSelected: boolean = false;  // Flag to check if address is selected

//   constructor(private clientService: ClientService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private modal: NzModalService,
//     private dialog: MatDialog, private fb: FormBuilder) { }


//   ngOnInit(): void {
//     const navigation = this.router.getCurrentNavigation();
//     if (navigation && navigation.extras.state) {
//       this.selectedAddress = navigation.extras.state['selectedAddress'];
//     }
//     console.log('Selected Address:', this.selectedAddress); // Debugging line
//     if (this.selectedAddress) {
//       this.addressSelected = true; // Update the flag if the address is passed
//     }
//   }

//   package1Quantity: number = 0;
//   package2Quantity: number = 0;

//   addPackage(packageId: number) {
//     if (packageId === 1) {
//       this.package1Quantity = 1;
//     } else if (packageId === 2) {
//       this.package2Quantity = 1;
//     }
//   }

//   openAddModal(): void {
//     const dialogRef = this.dialog.open(AddAddressModalComponent, {
//       width: '500px',
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         console.log("New address data:", result)
//         this.selectedAddress = result;
//         console.log("Slected address:", this.selectedAddress) // Store the selected address
//         this.addressSelected = true;    // Set the flag to true
//       }
//     });
//   }

//   incrementPackage(packageId: number) {
//     if (packageId === 1) {
//       this.package1Quantity++;
//     } else if (packageId === 2) {
//       this.package2Quantity++;
//     }
//   }

//   decrementPackage(packageId: number) {
//     if (packageId === 1 && this.package1Quantity > 0) {
//       this.package1Quantity--;
//     } else if (packageId === 2 && this.package2Quantity > 0) {
//       this.package2Quantity--;
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  selectedAddress: any = null;
  addressSelected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.selectedAddress = navigation.extras.state['selectedAddress'];
    }
    if (this.selectedAddress) {
      this.addressSelected = true;
    }
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddAddressModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAddress = result;
        this.addressSelected = true;
      }
    });
  }

}
