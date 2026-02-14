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
  public phrase: WritableSignal<string> = signal<string>('El Amor');

  public async showModal() {
    const { value: text } = await Swal.fire({
      title: "Si lo das, no se acaba; si lo guardas, se enfría. ¿Qué es?",
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
      inputPlaceholder: "Respuesta",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "rgb(251, 163, 213)",
      cancelButtonColor: "rgb(169, 226, 232)",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (this.format(value) === this.format(this.phrase())) {
            resolve();
          } else {
            resolve("Respuesta incorrecta ☝🏻😌");
          }
        });
      },
      showCancelButton: true
    });

    if (text) {

      Swal.fire({
        title: "🎊 Respuesta correcta 🎊",
        text: "Porque al final no se trata de una fecha, sino de la forma en que uno cuida, acompaña y está.",
        icon: "success",
        showConfirmButton: false,
        width: 500,
        timer: 8000
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
