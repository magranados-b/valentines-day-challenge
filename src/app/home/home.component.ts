import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  public showMap: WritableSignal<boolean> = signal<boolean>(false);
  public phrase: WritableSignal<string> = signal<string>('Enjambre');

  public async showModal() {
    const { value: text } = await Swal.fire({
      title: "¿Cuál es mi banda favorita? Pista: 🐝",
      input: "text",
      width: 500,
      heightAuto: false,
      padding: "2em",
      color: "rgb(251, 163, 213)",
      backdrop: `
      rgba(0, 0, 0, 0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      inputPlaceholder: "Nombre",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "rgb(251, 163, 213)",
      cancelButtonColor: "rgb(169, 226, 232)",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (this.format(value) === this.format(this.phrase())) {
            resolve();
          } else {
            resolve("Te falta barrio musical 😠");
          }
        });
      },
      showCancelButton: true
    });

    if (text) {

      Swal.fire({
        title: "🤘🏼 Ahh loca… ¡sí te la sabes! 🤘🏼",
        text: "Enjambre por siempre 🐝",
        icon: "success",
        showConfirmButton: false,
        width: 500,
        timer: 5000
      });
      this.showMap.set(true);
    }

  }

  private format(t: string | null | undefined): string {
    const s = (t ?? '');
    const n = (typeof (s as any).normalize === 'function') ? s.normalize('NFKC') : s;

    return n
      .replace(/\r\n?|\n/g, '\n')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[\s\u00A0]+/g, ' ')
      .trim()
      .toLocaleLowerCase('es-MX');
  }

}
