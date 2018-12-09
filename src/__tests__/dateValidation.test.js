import DeltaFormProvider from "../container/DeltaFormProvider"

test('Valid Date', () => {
    const date = new DeltaFormProvider().getDate("18/03/1996");
    expect(date).toEqual(new Date(1996, 2, 18))
});