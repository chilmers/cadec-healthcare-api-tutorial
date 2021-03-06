#Lab 1 (5 minutes)

Objective: Use curl to manipulate some requests to an API to see how it affects the outcome


##Task 1: Fetch public data from the HSA API to get information about a healthcare facility.

Open a browser and go to the HSA information API at the SDK site: [http://sdk.minavardkontakter.se/api/sv/service/hsa-hamta-ett-hsa-objekt](http://sdk.minavardkontakter.se/api/sv/service/hsa-hamta-ett-hsa-objekt)

Use the following curl command with verbose (-v) output against the HSA data API to fetch details about a health care facility.

~~~
  curl -v http://api.offentligdata.minavardkontakter.se/orgmaster-hsa/v1/hsaObjects/SE2321000016-10S5
~~~

Expected outcome:
The API returns information about the the requested HSA object formatted as json as this is the default format.

**SE2321000016-10S5** is the HSA-id of a dentist at Lidingö.

The verbose output flag will give you detailed information about the HTTP request and response.
Take a minute and try to understand the output of the command.

**Hint:** A line starting with > means it is part of the request, and < means it is part of the response. 



##Task 2: Manipulate the curl command and add an Accept header to receive xml or csv instead of json.

Use the API description at the SDK site to find out acceptable MIME types (i.e. formats) [http://sdk.minavardkontakter.se/api/sv/service/hsa-hamta-ett-hsa-objekt](http://sdk.minavardkontakter.se/api/sv/service/hsa-hamta-ett-hsa-objekt)


**Hint:**
 
 *  Request headers are set with the -H flag in curl, e.g. -H"[header name]: [header value]"
 *  We want to set the header named Accept
  
 
