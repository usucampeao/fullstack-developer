import { Imovel } from './../../../models/imovel.interface';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CepService } from '@app/core/services/cep.service';
import { ImovelService } from '@app/services/imovel.service';
import { Subject, throwError } from 'rxjs';
import { catchError, retry, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
@Component({
    selector: 'app-cadastrar-imovel',
    templateUrl: './cadastrar-imovel.component.html',
    styleUrls: ['./cadastrar-imovel.component.scss']
})
export class CadastrarImovelComponent implements OnDestroy {
    formulario?: FormGroup;
    destroy = new Subject();
    id: string = null;
    constructor(private fb: FormBuilder, private cep: CepService, private imovel: ImovelService,
        private activatedRoute: ActivatedRoute, private toast: MatSnackBar) {
        this.initForm();

        this.activatedRoute.paramMap.pipe(takeUntil(this.destroy)).subscribe(async (params: ParamMap) => {
            if (params.get('id')) {
                this.id = params.get('id');
                this.getImovelById(this.id);
            }
        });


    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    getLocal(e) {
        const { value } = e.target;
        if (value.length === 8) {
            this.cep.getEndereco(value)
            .pipe(
                retry(2),
                catchError(e => throwError(e))
                )
                .subscribe((res: any) => {
                    const { localidade, bairro, cep, logradouro, uf } = res;
                    console.log({ localidade, bairro, logradouro, uf })
                    this.formulario.patchValue({ localidade, bairro, logradouro, uf });
                });
        }
    }

    initForm(){
        this.formulario = this.fb.group({
            titulo: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            valor: [null, [Validators.required]],
            area: [null, [Validators.required]],
            cep: [null, [Validators.required]],
            logradouro: [null, [Validators.required]],
            complemento: [null],
            numero: [null],
            bairro: [null, [Validators.required]],
            localidade: [null, [Validators.required]],
            uf: [null, [Validators.required]],
        });
    }
    
    matcher = new MyErrorStateMatcher();

    submitForm(): void {
        for (const i in this.formulario.controls) {
            this.formulario.controls[i].markAsDirty();
            this.formulario.controls[i].updateValueAndValidity();
        }
        if (this.formulario.valid) {
            console.log(this.formulario.value);
            if (this.id) {
                this.alterarImovel(this.id, this.formulario.value);
            } else {
                this.gravarImovel(this.formulario.value);
            }
            
            this.initForm();
        }
    }

    gravarImovel(imovel: Imovel) {
        this.imovel.gravarImovel(imovel)
        .pipe(
            retry(2),
            catchError(e => throwError(e))
            )
            .subscribe((res: any) => {
                this.toast.open('Imóvel salvo com sucesso', '', {
                    duration: 3000,
                    verticalPosition: 'top',
                })
            });
    }

    alterarImovel(id: string, imovel: Imovel) {
        this.imovel.alterarImovel(id, imovel)
        .pipe(
            retry(2),
            catchError(e => throwError(e))
            )
            .subscribe((res: any) => {
                this.toast.open('Imóvel alterado com sucesso', '', {
                    duration: 3000,
                    verticalPosition: 'top',
                })
            });
    }

    getImovelById(id: string) {
        this.imovel.getImovelById(id)
        .pipe(
            retry(2),
            catchError(e => throwError(e))
            )
            .subscribe((res: Imovel) => {
                if (!res) {
                    this.id = null;
                    this.toast.open('Imóvel não encontrado', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                    })
                } else {
                    this.formulario.patchValue(res);
                }
            });
    }

}
