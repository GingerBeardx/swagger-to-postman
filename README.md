# Swagger to Postman Converter

This project is a React-based web application that facilitates the conversion of Swagger API documentation into a Postman collection format.

# Planned Modifications

- [ ] Add option to include a prescript
  - this may be based on pasted information so as to not disclose proprietary information
- [ ] Fix some responsiveness issues with long endpoint names wrapping onto a new line in slightly smaller windows
- [ ] Rather than just copying to the clipboard, implement logic to create a file that will be saved to the computer, bypassing the need to complete this step manually
- [ ] Pull in paramters and set default values
  - Replace the paramters in the URL
  - Also be able to set some default values for objects based on types
- [ ] Be able to compare two postman files

# Features

- Paste from Clipboard: Users can easily paste their Swagger JSON directly into the provided input.
- Select Endpoints: After parsing the Swagger JSON, users can select which specific endpoints they want to include in the Postman collection.
- Error Notifications: The application provides visual feedback in the form of notifications for any errors encountered, such as invalid JSON format.
- Postman Collection Output: Once the conversion is done, the resulting Postman collection is displayed, allowing users to review it before use.
- Copy to Clipboard: With a single click, users can copy the generated Postman collection to their clipboard, ready to be imported into Postman.

# Usage

1. Open the application.
1. Paste your Swagger JSON into the provided input area.
1. Select the endpoints you wish to include in your Postman collection.
1. Click on the "Convert Selected to Postman" button.
1. Review the generated Postman collection.
1. Click the "Copy To Clipboard" button to copy the generated collection, ready to be imported into Postman.

# Components

- SwaggerInput: This component allows users to paste their Swagger JSON and provides controls for clearing the input or handling errors.
- EndpointList: Displays a list of available endpoints from the Swagger JSON for users to select.
- ConversionResult: Shows the resulting Postman collection after conversion.
- Notification: A visual feedback component that displays error messages or other notifications.
- Button: A reusable button component.

# Dependencies

This project uses Vite-React and is styled with Tailwind CSS for a sleek and responsive design.

# Contribution

Contributions are welcome! Please fork this repository and open a pull request to add enhancements or bug fixes.

# License

This project is open-source and available under the MIT License.
