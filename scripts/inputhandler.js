export default function inputhandler(input, writeTo) {
    if (input.length < 0 ) {
        writeTo = input.value.tostring();
    }
     
    console.log(writeTo); 
    return writeTo;
}