export class Animais{
    private _id!: string;
    private _especie: string;
    private _nome: string;
    private _genero: number;
    private _peso!: number;
    private _saude!: number;
    private _downloadURL: any;
    private _uid: any;

    constructor(especie:string,nome:string,genero:number,saude:number){
        this._especie=especie;
        this._genero=genero;
        this._nome=nome;
        this._saude=saude;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get especie(): string {
        return this._especie;
    }
    public set especie(value: string) {
        this._especie = value;
    }
    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }
    public get genero(): number {
        return this._genero;
    }
    public set genero(value: number) {
        this._genero = value;
    }
    public get peso(): number {
        return this._peso;
    }
    public set peso(value: number) {
        this._peso = value;
    }
    public get saude(): number {
        return this._saude;
    }
    public set saude(value: number) {
        this._saude = value;
    }
    public get downloadURL(): any {
        return this._downloadURL;
    }
    public set downloadURL(value: any) {
        this._downloadURL = value;
    }
    public get uid(): any {
        return this._uid;
    }
    public set uid(value: any) {
        this._uid = value;
    }
}

