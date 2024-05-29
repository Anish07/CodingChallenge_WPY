$(document).ready(function () {
    const regions = {
        Canada: [
            { code: "AB", name: "Alberta" },
            { code: "BC", name: "British Columbia" },
            { code: "MB", name: "Manitoba" },
            { code: "NB", name: "New Brunswick" },
            { code: "NL", name: "Newfoundland and Labrador" },
            { code: "NS", name: "Nova Scotia" },
            { code: "ON", name: "Ontario" },
            { code: "PE", name: "Prince Edward Island" },
            { code: "QC", name: "Quebec" },
            { code: "SK", name: "Saskatchewan" },
            { code: "NT", name: "Northwest Territories" },
            { code: "YT", name: "Yukon" },
            { code: "NU", name: "Nunavut" }
        ],
        USA: [
            { code: "AL", name: "Alabama" },
            { code: "AK", name: "Alaska" },
            { code: "AZ", name: "Arizona" },
            { code: "AR", name: "Arkansas" },
            { code: "CA", name: "California" },
            { code: "CO", name: "Colorado" },
            { code: "CT", name: "Connecticut" },
            { code: "DE", name: "Delaware" },
            { code: "FL", name: "Florida" },
            { code: "GA", name: "Georgia" },
            { code: "HI", name: "Hawaii" },
            { code: "ID", name: "Idaho" },
            { code: "IL", name: "Illinois" },
            { code: "IN", name: "Indiana" },
            { code: "IA", name: "Iowa" },
            { code: "KS", name: "Kansas" },
            { code: "KY", name: "Kentucky" },
            { code: "LA", name: "Louisiana" },
            { code: "ME", name: "Maine" },
            { code: "MD", name: "Maryland" },
            { code: "MA", name: "Massachusetts" },
            { code: "MI", name: "Michigan" },
            { code: "MN", name: "Minnesota" },
            { code: "MS", name: "Mississippi" },
            { code: "MO", name: "Missouri" },
            { code: "MT", name: "Montana" },
            { code: "NE", name: "Nebraska" },
            { code: "NV", name: "Nevada" },
            { code: "NH", name: "New Hampshire" },
            { code: "NJ", name: "New Jersey" },
            { code: "NM", name: "New Mexico" },
            { code: "NY", name: "New York" },
            { code: "NC", name: "North Carolina" },
            { code: "ND", name: "North Dakota" },
            { code: "OH", name: "Ohio" },
            { code: "OK", name: "Oklahoma" },
            { code: "OR", name: "Oregon" },
            { code: "PA", name: "Pennsylvania" },
            { code: "RI", name: "Rhode Island" },
            { code: "SC", name: "South Carolina" },
            { code: "SD", name: "South Dakota" },
            { code: "TN", name: "Tennessee" },
            { code: "TX", name: "Texas" },
            { code: "UT", name: "Utah" },
            { code: "VT", name: "Vermont" },
            { code: "VA", name: "Virginia" },
            { code: "WA", name: "Washington" },
            { code: "WV", name: "West Virginia" },
            { code: "WI", name: "Wisconsin" },
            { code: "WY", name: "Wyoming" }
        ]
    };

    $("#country").change(function () {

        // dynamically shows provinces/states based on which country is selected
        const country = $(this).val();
        const provinceDropdown = $("#province");

        provinceDropdown.empty().append('<option value="">Select Province/State</option>');
        regions[country].forEach(region => {
            provinceDropdown.append($('<option></option>').attr('value', region.code).text(region.name));
        });

    });

    $("#registrationForm").submit(function (event) {
        event.preventDefault();
        let valid = true;

        // possible additional validations can be added here
        const firstName = $('#firstName').val().trim();
        const lastName = $('#lastName').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const phoneNumber = $('#phoneNumber').val().trim();
        const address = $('#address').val().trim();
        const city = $('#city').val().trim();
        const province = $('#province').val();
        const country = $('#country').val();

        if (firstName.length === 0 || firstName.length > 255) {
            valid = false;
            alert("First Name must be between 1 and 255 characters.");
            $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
            return;
        }

        if (lastName.length === 0 || lastName.length > 255) {
            valid = false;
            alert("Last Name must be between 1 and 255 characters.");
            $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
            return;
        }

        if (password.length === 0) {
            valid = false;
            alert("Password cannot be empty.");
            $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
            return;
        }

        if (address.length === 0 || address.length > 255) {
            valid = false;
            alert("Address must be between 1 and 255 characters.");
            $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
            return;
        }

        if (city.length === 0 || city.length > 255) {
            valid = false;
            alert("City must be between 1 and 255 characters.");
            $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
            return;
        }

        if (country !== "Canada" && country !== "USA") {
            valid = false;
            alert("Please select a valid country.");
            $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
            return;
        }

        // collect form data
        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            province: province,
            country: country
        };

        // sends it to backend via POST request to /register
        if (valid) {
            $.ajax({
                url: '/register',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (response) {
                    $("#formMessage").html("<span class='text-success'>Registration successful!</span>");
                },
                error: function () {
                    $("#formMessage").html("<span class='text-danger'>An error occurred. Please try again.</span>");
                }
            });
        }
    });
});
