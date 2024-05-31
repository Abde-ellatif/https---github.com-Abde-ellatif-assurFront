import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommandesService {
    public httpClient = inject(HttpClient);
    public endpoint = 'compagnie';
    public endpointMilliard = 'Commandes';
    public soldeChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // getSolde() {
    //     return this.httpClient.get<any>(`${environment.aasURL}/${this.endpoint}/service/stock-qr`);
    // }
    //
    // initCommande(nombreQr: number) {
    //     return this.httpClient.post<any>(`${environment.aasURL}/${this.endpoint}/commandes/init-command?nombreQr=${nombreQr}`, {});
    // }
    //
    // initCommandeMilliard(commande: any) {
    //     return this.httpClient.post<any>(`${environment.apiURL}/${this.endpointMilliard}/init-commande`, commande);
    // }
    //
    // cancelCommande(reference: string) {
    //     return this.httpClient.put<any>(`${environment.aasURL}/${this.endpoint}/commandes/cancel/${reference}`, {});
    // }
    //
    // validateCommande(commande: FormData) {
    //     return this.httpClient.post<any>(`${environment.aasURL}/${this.endpoint}/commandes/valid-command`, commande);
    // }
    //
    // syncCommandeMilliard(commande: any) {
    //     return this.httpClient.post<any>(`${environment.apiURL}/${this.endpointMilliard}/update-commande`, commande);
    // }
    //
    // getCommandes() {
    //     return this.httpClient.get<any>(`${environment.aasURL}/${this.endpoint}/commandes/commandes`);
    // }


}
