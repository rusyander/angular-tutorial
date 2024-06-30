import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { TicketsServiceService } from '../tickets-service.service';
import { Status } from '../tickets.model';

@Component({
  selector: 'app-new-ticker',
  standalone: true,
  templateUrl: './new-ticker.component.html',
  styleUrl: './new-ticker.component.css',
  imports: [ButtonComponent, ControlComponent, FormsModule],
})
export class NewTickerComponent implements AfterContentInit {
  // @ViewChild('form') form!: HTMLFormElement;
  // @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  @ContentChild('input') private control: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  > | null = null;

  private controls = contentChild<ElementRef>('input');

  constructor(private ticketsServiceService: TicketsServiceService) {
    afterNextRender(() => {
      console.log('after Next Render');
      // console.log(this.control);
    });

    afterRender(() => {
      console.log('after render');
      // console.log(this.control);
    });
  }

  ngAfterContentInit() {
    console.log(this.controls);
  }

  title = signal<string>('');
  request = signal<string>('');

  onSubmit(
    title: HTMLInputElement,
    request: HTMLTextAreaElement,
    form: HTMLFormElement
  ) {
    if (!title.value && !request.value) return;

    const data = {
      title: title.value,
      request: request.value,
      status: 'closed' as Status,
    };

    this.ticketsServiceService.addNewTicket(data);

    form.reset();
    // this.form.nativeElement.reset();
  }
}
