import { Injectable } from '@angular/core';

export class Settings {
    constructor(public name: string,
                public theme: string,
                public toolbar: number,
                public stickyMenuToolbar: boolean,                
                public header: string,
                public rtl: boolean,
                public searchPanelVariant: number,
                public searchOnBtnClick: boolean,
                public currency: string,

                //additional options
                public mainToolbarFixed:boolean,
                public contentOffsetToTop:boolean,                
                public headerBgImage: boolean,
                public headerBgVideo: boolean,
                public loadMore: {                    
                    start: boolean,
                    step: number,
                    load: boolean,
                    page: number,
                    complete: boolean,
                    result: number
                } 
                ) { }
}

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'UsuImoveis',  // Nome do Tema
        'blue',      // blue, green, red, pink, purple, grey, orange-dark
        1,           //define o tipo da barra de ferramentas, podemos criar varios tipos 
        true,        // define se fixa ou nao a barra de ferramentas 
        'image',     // deine um tipo de pagina inicial 
        false,       // define a posicao do menu true = rtl, false = ltr
        1,           //  define um tipo para os inputs, podem ser definidos varios 
        false,       //  define se existira um botao para a pesquisa  
        'BRL',       // USD, EUR

        //NOTE: não altere os valores das opções adicionais, eles são usados ​​para o desempenho do tema
        false,
        false,
        false,        
        false,
        {            
            start: false,
            step: 1,
            load: false,
            page: 1,
            complete: false,
            result: 0
        }  
    )
}