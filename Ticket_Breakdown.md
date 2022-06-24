# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


**Ticket 1. Save custom ids of Agents in database.**
- Should make a table AgentID_Facility with three fields. (agent_id, facility_id, custom_id).
- Facility should provide all unique custom ids of Agents they booked.
- One Agent can have only one custom id per each Facility.
- It doesn't take much time to make a new table. About 20 mins maximum.

**Ticket 2. Upate `getShiftsByFacility` function.**
- Get Shifts and Agents with given Facility id.
- Should confirm that all Agents in Facility has their own custom ids in AgentID_Facility table.
- Join AgentID_Facility table so Shift can have custom Agent id in Agent metadata.
- Joining table would take 3 mins to implement.

**Ticket3. Update `generateReport` function.**
- Whene generate the PDF file, use custom Agent id from AgentID_Facility in report instead of using database id of Agent.