MFC APi Endpoints

POST

bookings/

{
	"property_name": "the-stables",
	"start": date,
	"end": date
	"value":
}

??
Name of bookee
Contact details
etc
Should probably go in a different table/document


GET

bookings/

Lists all bookings


GET

bookings/property_name

List all bookings for a specific property


GET

bookings/property_name/range/start_date/end_date

List all bookings for a specific property for a range of dates


GET

bookings/property_name/start_date

List bookings for a specific property starting on a specific date