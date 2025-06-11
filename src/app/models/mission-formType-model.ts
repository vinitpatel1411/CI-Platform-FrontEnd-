import { FormControl } from '@angular/forms';

export type addMissionForm = {
  title: FormControl<string | null>;
  shortDescription : FormControl<string | null>;
  description: FormControl<string | null>;
  organization: FormControl<string | null>;
  startDate: FormControl<Date | string | null>;
  endDate: FormControl<Date | string | null>;
  registrationDeadlineDate: FormControl<Date | string | null>;
  country: FormControl<string | null>;
  city: FormControl<string | null>;
  totalSeats: FormControl<string | null>;
  theme: FormControl<string | null>;
  availability: FormControl<string | null>;
  missionType: FormControl<string | null>;
}
