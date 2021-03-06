#Lab 2  (15 minutes)

Objective: Use OAuth 2.0 access tokens to access patient data 
           using the APIs for patient related data for third parties


##Task 1: There is a development environment which is protected by OAuth 2.0 but possible to reach without using SSL certificates.

Use curl without any headers to try to access scheduled bookings at [http://dev.apigw.minavardkontakter.se/crm/scheduling/v1/schedule](http://dev.apigw.minavardkontakter.se/crm/scheduling/v1/schedule)

~~~~
  curl -v http://dev.apigw.minavardkontakter.se/crm/scheduling/v1/schedule
~~~~

**Expected outcome:**
You should get an error saying that you are not authorized.



##Task 2: The development environment also holds pre-generated access tokens for a set of fictive test persons.

Pre-generated access tokens:
~~~~
Resident id   Name                Access token
188803099368  Agda Andersson      cf70be6c-9dcd-11e1-8c70-12313c036113
191704109279  Åke Jansson         d36be172-9dcd-11e1-8c70-12313c036113
193504049135  Filip Wallden       d37c4ecc-9dcd-11e1-8c70-12313c036113
197705232382  Frida Kranstege     d37ed4da-9dcd-11e1-8c70-12313c036113
192011189228  Gunbritt Boden      d38142ec-9dcd-11e1-8c70-12313c036113
194804032094  Laban Meijer        d3919a2a-9dcd-11e1-8c70-12313c036113
194606109108  Magdalena Karlgren  d393f158-9dcd-11e1-8c70-12313c036113
196302052383  Mariana Källström   d3963e90-9dcd-11e1-8c70-12313c036113
199008199391  Mohamed Al Samed    d39ae13e-9dcd-11e1-8c70-12313c036113
197309069289  Nina Greger         d39d6bf2-9dcd-11e1-8c70-12313c036113
199008252398  Oskar Johansson     d3a92898-9dcd-11e1-8c70-12313c036113
192705178354  Per-Uno Karlsson    d3ab7e5e-9dcd-11e1-8c70-12313c036113
194911172296  Sven Sturesson      d3add5dc-9dcd-11e1-8c70-12313c036113
198611062384  Ulla Alm            d470349c-9dcd-11e1-8c70-12313c036113
~~~~

There is a page on the SDK site describing the development environment which is holding the list above. : [http://sdk.minavardkontakter.se/en/sdk-api/svenska-utvecklingsmiljo/](http://sdk.minavardkontakter.se/en/sdk-api/svenska-utvecklingsmiljo/)

Use curl to access the scheduled bookings for any of the fictive persons in the list above. 
To do this you need to set the access token in the Authorization header of the request.
The access token is set in the Authorization request header with a Bearer prefix: 
  
  Authorization: Bearer [access token]

The URL to the sheduled bookings is: [http://dev.apigw.minavardkontakter.se/crm/scheduling/v1/schedule](http://dev.apigw.minavardkontakter.se/crm/scheduling/v1/schedule)

~~~~
  curl -v -H"Authorization: Bearer d3919a2a-9dcd-11e1-8c70-12313c036113" http://dev.apigw.minavardkontakter.se/crm/scheduling/v1/schedule
~~~~

Expected outcome: The bookings of the selected fictive person is returned as json.
You can read more about the API resource you just eused at this page:
[http://sdk.minavardkontakter.se/api/sv/service/tidbokning-hamta-alla-mina-tidbokningar-nationellt](http://sdk.minavardkontakter.se/api/sv/service/tidbokning-hamta-alla-mina-tidbokningar-nationellt)
If you want, you can also try to get the same data returned as xml.

