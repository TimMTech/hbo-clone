export const convertRuntime = (runtime:number) => {
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    if (hours === 0) {
        return minutes + " MIN"
    }
    return hours + " HR " + minutes + " MIN ";
}

