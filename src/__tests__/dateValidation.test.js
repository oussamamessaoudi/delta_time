import DeltaFormProvider from "../container/DeltaFormProvider"

test('Valid Date', () => {
    const date = new DeltaFormProvider().getDate("18/03/1996");
    expect(date).toEqual(new Date(1996, 2, 18))
});

test('Valid Date 29 Feb', () => {
    const date = new DeltaFormProvider().getDate("29/02/2020");
    expect(date).toEqual(new Date(2020, 1, 29))
});

test('InValid Date (year)', () => {
    const date = new DeltaFormProvider().getDate("18/03/196");
    expect(date).toEqual(null);
});

test('InValid Date (month)', () => {
    const date = new DeltaFormProvider().getDate("18/13/1996");
    expect(date).toEqual(null);
});

test('InValid Date (day)', () => {
    const date = new DeltaFormProvider().getDate("00/03/1996");
    expect(date).toEqual(null);
});
