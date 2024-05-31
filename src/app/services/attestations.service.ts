import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { AuthService } from "../../@core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AttestationsService {
    public httpClient = inject(HttpClient);
    public authService = inject(AuthService);

    public endpointMilliard = 'Attestations';
    public endpointAAS = 'compagnie';

    // getAttestations() {
    //     const mUser = this.authService.milliardUserSubject.value;
    //     return this.httpClient.post<any>(`${environment.apiURL}/${this.endpointMilliard}/get-attestations`, { login: mUser?.user, password: mUser?.password });
    // }
    //
    // getRC(vehiculeData: any) {
    //     return this.httpClient.get<any>(`${environment.aasURL}/${this.endpointAAS}/service/rc-request?puissanceFiscale=${vehiculeData.puissanceFiscale}&duree=${vehiculeData.duree}&genre=${vehiculeData.genre}&energie=${vehiculeData.energie}&periodicite=${vehiculeData.periodicite}`);
    // }
    //
    // editAttestationMono(vehicule: any) {
    //     return this.httpClient.post<any>(`${environment.aasURL}/${this.endpointAAS}/service/qrcode-request`, vehicule);
    // }
    //
    // syncAttestationMono(att: any) {
    //     return this.httpClient.post<any>(`${environment.apiURL}/${this.endpointMilliard}/sync-attestation`, att);
    // }
}
