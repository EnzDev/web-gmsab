export class Picture {
    public tags: [String];

    constructor(public url: String, public creation: Date, public seed?: string) {}
}
