$(document).ready(function()
{
    $("#test").keyup(function(e) {
        let key = e.key;

        // Might want to just do the replace here and have a generic calculate method
        console.log(key);
        if (key === "Backspace") {
            let val = $(this).val();
            $(this).val(val.substr(0, val.length));
        }
        /*
        else if (key === "=") {
            // calculate
        }
        */
        else {
            $(this).val($(this).val().replace(/[^\d()\-+/*]/g, ''));
        }
    });
});