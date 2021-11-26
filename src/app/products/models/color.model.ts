export class Color {
  hex_value: string;
  color_name: string;
  selected: boolean;
  constructor(options: any = {}){
    this.hex_value = options.hex_value;
    this.color_name = options.color_name;
    this.selected = options.selected;

  }
}
