export const convertRuntime = (runtime:number) => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    return hours + " HR " + minutes + " MIN ";
}