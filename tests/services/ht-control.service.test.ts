import { expect } from 'chai';
import { TestHelpers } from '../test-helpers';
import { HTControlService } from '../../src/services/ht-control.service';

describe('HTControlService', () => {
  describe('GetIRRepeaterState', () => {
    it('executes correct request', async (done) => {
      TestHelpers.mockRequestToService('/HTControl/Control',
        'HTControl',
        'GetIRRepeaterState',
        '',
        '<CurrentIRRepeaterState>Disabled</CurrentIRRepeaterState>'
      );
      const service = new HTControlService(TestHelpers.testHost);
      const result = await service.GetIRRepeaterState();

      expect(result.CurrentIRRepeaterState).to.be.equal('Disabled');
      done();
    });
  });
  describe('GetLEDFeedbackState', () => {
    it('executes correct request', async (done) => {
      TestHelpers.mockRequestToService('/HTControl/Control',
        'HTControl',
        'GetLEDFeedbackState',
        '',
        '<LEDFeedbackState>On</LEDFeedbackState>'
      );
      const service = new HTControlService(TestHelpers.testHost);
      const result = await service.GetLEDFeedbackState();

      expect(result.LEDFeedbackState).to.be.equal('On');
      done();
    });
  });
  describe('Event parsing', () => {
    it('works', (done) => {
      process.env.SONOS_DISABLE_EVENTS = 'true'
      const service = new HTControlService(TestHelpers.testHost, 1400);
      service.Events.once('serviceEvent', (data) => {
        expect(data.IRRepeaterState).to.be.equal('Disabled');
        expect(data.LEDFeedbackState).to.be.undefined;
        expect(data.RemoteConfigured).to.be.undefined;
        expect(data.TOSLinkConnected).to.be.true;
        done()
      })
      service.ParseEvent('<e:propertyset xmlns:e="urn:schemas-upnp-org:event-1-0"><e:property><TOSLinkConnected>1</TOSLinkConnected></e:property><e:property><IRRepeaterState>Disabled</IRRepeaterState></e:property></e:propertyset>');
      delete process.env.SONOS_DISABLE_EVENTS
    }, 1)
  })
});
