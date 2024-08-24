// Bibliotecas / imports
import booking from '../fixtures/booking.json'
import update from '../fixtures/update.json'

describe('Booker API', () => {
  
  before('Create Token', () => {
    cy.createToken()
  })// termina before
  
  it('Create Booking', () => {
    cy.request({
      method: 'POST',
      url: '/booking',
      body: booking
    }).then(({ status, body}) => {
      expect(status).to.eq(200)
      Cypress.env('bookingid', body.bookingid)
      expect(body.booking.firstname).to.eq('Rose')
      expect(body.booking.lastname).to.eq('Cardoso')
      expect(body.booking.totalprice).to.eq(350)
      expect(body.booking.depositpaid).to.eq(true)
      expect(body.booking.bookingdates.checkin).to.eq('2024-08-23')
      expect(body.booking.bookingdates.checkout).to.eq('2024-08-25')
      expect(body.booking.additionalneeds).to.eq('Breakfast')

    }) // termina cy
  })// termina POST

  // Update parcial
  it('Patch Booking', () => {
    cy.request({
      method: 'PATCH',
      url: `/booking/${Cypress.env('bookingid')}`,
      body: update,
      headers: {
        Cookie: `token=${Cypress.env('token')}`
      }  
    }).then(({ status, body}) => {
      expect(status).to.eq(200)
      expect(body.firstname).to.eq('Rose')
      expect(body.lastname).to.eq('Cardoso')
      expect(body.totalprice).to.eq(350)
      expect(body.depositpaid).to.eq(true)
      expect(body.bookingdates.checkin).to.eq('2024-08-23')
      expect(body.bookingdates.checkout).to.eq('2024-08-25')
      expect(body.additionalneeds).to.eq('Dinner')
    })
  }) // termina patch

  it('Delete Booking', () => {
    cy.request({
      method: 'DELETE',
      url: `/booking/${Cypress.env('bookingid')}`,
      headers: {
        Cookie: `token=${Cypress.env('token')}`
      }
    }).then(({ status }) => {
      expect(status).to.eq(201)
    })
  }) // termina delete

}) // termina describe