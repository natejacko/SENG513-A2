$(document).ready(function()
{
    let ans = null;
    
    // Digits, parenthesis, and operators are added blindly to input
    $("button").filter(function() {
        return $(this).text().match(/[\d()/*\-+.]/);
    }).click(function() {   
        $("input").val($("input").val() + $(this).text());
    });

    // C button clears all of the current input
    $("button").filter(function() {
        return $(this).text() === "C";
    }).click(function() {   
        // Clear all input and reset input placeholder
        $("input").val("");
        $("input").attr("placeholder", "0");
        $("input").removeClass("error");
    });

    // CE button clears the last entered input
    $("button").filter(function() {
        return $(this).text() === "CE";
    }).click(function() {    
        // Clear last input and reset input placeholder if no more input exists
        let val = $("input").val();
        $("input").val(val.substr(0, val.length - 1));
        if ($("input").val().length === 0)
        {
            $("input").attr("placeholder", "0");
            $("input").removeClass("error");
        }
    });

    // Equals tries to evaluate the equation, then updates the history with the answer or error
    $("button").filter(function() {
        return $(this).text() === "=";
    }).click(function() {    
        // Get current value
        let val = $("input").val();
        if (val.length === 0)
        {
            val = "0";
        }
        $("span:eq(1)").text(val);

        try {
            // Try to evaluate the equation (replacing "Ans" with the previous answer)
            let temp = eval(val.split("Ans").join(ans));
            ans = temp;
            $("input").val("");

            // Enable the Ans button since the equation was valid
            $("button").filter(function() {
                return $(this).text() === "Ans";
            }).prop("disabled", false);
            
            // Reset placeholder and display result
            $("input").attr("placeholder", "0");
            $("input").removeClass("error");

            $("span:eq(1)").text($("span:eq(1)").text() + " = " + ans);
        }
        catch {
            // Disable the Ans button since equation was invalid
            $("button").filter(function() {
                return $(this).text() === "Ans";
            }).prop("disabled", true);

            // Set placeholder to error class and display result/error
            $("input").val("");
            $("input").attr("placeholder", "ERROR!");
            $("input").addClass("error");

            $("span:eq(1)").text($("span:eq(1)").text() + " = ERROR");
        }
    });

    // Answer blindly adds "Ans" to the input string
    $("button").filter(function() {
        return $(this).text() === "Ans";
    }).click(function() {  
        $("input").val($("input").val() + "Ans");
    });
});