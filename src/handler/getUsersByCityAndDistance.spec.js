const herokuGetUsers = require('../api/herokuGetUsers');
const herokuGetUsersInCity = require('../api/herokuGetUsersInCity');
const mergeUsersByCityAndDistance = require('./mergeUsersByCityAndDistance');
const getUsersByCityAndDistance = require('./getUsersByCityAndDistance');

jest.mock('../api/herokuGetUsers');
jest.mock('../api/herokuGetUsersInCity');
jest.mock('./mergeUsersByCityAndDistance');

describe('handler/getUsersByCityAndDistance', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        mergeUsersByCityAndDistance.mockImplementation();
    });

    it('calls both heroku apis', () => {
        herokuGetUsers.mockImplementation(() => [1, 2]);
        herokuGetUsersInCity.mockImplementation(() => [44, 55]);

        return getUsersByCityAndDistance({city: 'Zodnia', lat: 1, lng: 1})
            .then(() => {
                expect(herokuGetUsers).toHaveBeenCalled();
                expect(herokuGetUsersInCity).toHaveBeenCalledWith('Zodnia');
                expect(mergeUsersByCityAndDistance).toHaveBeenCalledWith({
                    allUsers: [1, 2],
                    cityUsers: [44, 55],
                    city: 'Zodnia',
                    distance: 50,
                    lat: 1,
                    lng: 1
                });
            });
    });

    it('does not call herokuGetUsers if no lat/lng can be calculated', () => {
        herokuGetUsers.mockImplementation();
        herokuGetUsersInCity.mockImplementation(() => [10, 9, 8]);

        return getUsersByCityAndDistance({city: 'Nowhere'})
            .then(() => {
                expect(herokuGetUsers).not.toHaveBeenCalled();
                expect(herokuGetUsersInCity).toHaveBeenCalledWith('Nowhere');
                expect(mergeUsersByCityAndDistance).toHaveBeenCalledWith({
                    allUsers: [],
                    cityUsers: [10, 9, 8],
                    city: 'Nowhere',
                    distance: 50
                });
            });
    });

    it('does not call herokuGetUsersInCity if no city is provided', () => {
        herokuGetUsers.mockImplementation(() => [66, 77, 88]);
        herokuGetUsersInCity.mockImplementation();

        return getUsersByCityAndDistance({lat: 12, lng: 13})
            .then(() => {
                expect(herokuGetUsers).toHaveBeenCalled();
                expect(herokuGetUsersInCity).not.toHaveBeenCalled();
                expect(mergeUsersByCityAndDistance).toHaveBeenCalledWith({
                    allUsers: [66, 77, 88],
                    cityUsers: [],
                    distance: 50,
                    lat: 12,
                    lng: 13
                });
            });
    });

    it('works out lat and lng from city if provided', () => {
        herokuGetUsers.mockImplementation(() => [42]);
        herokuGetUsersInCity.mockImplementation(() => [11, 33]);

        return getUsersByCityAndDistance({city: 'London'})
            .then(() => {
                expect(herokuGetUsers).toHaveBeenCalled();
                expect(herokuGetUsersInCity).toHaveBeenCalledWith('London');
                expect(mergeUsersByCityAndDistance).toHaveBeenCalledWith({
                    allUsers: [42],
                    cityUsers: [11, 33],
                    city: 'London',
                    distance: 50,
                    lat: 51.507222,
                    lng: -0.1275
                });
            });
    });

    it('handles an error in herokuGetUsers', () => {
        herokuGetUsers.mockImplementation(() => Promise.reject({xxx: 222}));
        herokuGetUsersInCity.mockImplementation(() => [44, 55]);

        return getUsersByCityAndDistance({city: 'Zodnia', lat: 1, lng: 1})
            .then((result) => {
                expect(mergeUsersByCityAndDistance).not.toHaveBeenCalled();
                expect(result).toEqual({error: true});
            });
    });

    it('handles an error in herokuGetUsersInCity', () => {
        herokuGetUsers.mockImplementation(() => [1, 2, 3]);
        herokuGetUsersInCity.mockImplementation(() => Promise.reject({xxx: 222}));

        return getUsersByCityAndDistance({city: 'Zodnia', lat: 1, lng: 1})
            .then((result) => {
                expect(mergeUsersByCityAndDistance).not.toHaveBeenCalled();
                expect(result).toEqual({error: true});
            });
    });

});
