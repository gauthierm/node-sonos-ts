import { expect } from 'chai';
import { TestHelpers } from '../test-helpers';
import { AVTransportService } from '../../src/services/av-transport.service';

describe('AVTransportService', () => {
  describe('AddURIToQueue', () => {
    it('parses response', async () => {
      const track = 'http://livingears.com/music/SceneNotHeard/091909/Do You Mind Kyla.mp3';
      TestHelpers.mockRequest('/MediaRenderer/AVTransport/Control',
        '"urn:schemas-upnp-org:service:AVTransport:1#AddURIToQueue"',
        '<u:AddURIToQueue xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><EnqueuedURI>http://livingears.com/music/SceneNotHeard/091909/Do%20You%20Mind%20Kyla.mp3</EnqueuedURI><EnqueueAsNext>1</EnqueueAsNext><EnqueuedURIMetaData></EnqueuedURIMetaData><DesiredFirstTrackNumberEnqueued>0</DesiredFirstTrackNumberEnqueued></u:AddURIToQueue>',
        'AddURIToQueueResponse',
        'AVTransport',
        '<FirstTrackNumberEnqueued>1</FirstTrackNumberEnqueued><NewQueueLength>1</NewQueueLength><NumTracksAdded>1</NumTracksAdded>');

      const service = new AVTransportService(TestHelpers.testHost, 1400);

      const result = await service.AddURIToQueue({
        InstanceID: 0,
        EnqueuedURI: track,
        EnqueueAsNext: true,
        EnqueuedURIMetaData: '',
        DesiredFirstTrackNumberEnqueued: 0,
      });
      expect(result).to.have.nested.property('FirstTrackNumberEnqueued', 1);
      expect(result).to.have.nested.property('NewQueueLength', 1);
      expect(result).to.have.nested.property('NumTracksAdded', 1);
    });
  });

  describe('Play()', () => {
    it('throws HttpError when faulty but no soap error', async () => {
      TestHelpers.mockHttpError('/MediaRenderer/AVTransport/Control',
        '"urn:schemas-upnp-org:service:AVTransport:1#Play"',
        '<u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>2</InstanceID><Speed>bla</Speed></u:Play>',
        400);

      const service = new AVTransportService(TestHelpers.testHost, 1400);

      try {
        await service.Play({ InstanceID: 2, Speed: 'bla' });
      } catch (error) {
        expect(error).to.have.property('Action', 'Play');
        expect(error).to.have.property('HttpStatusCode', 400);
        expect(error).to.have.property('name', 'HttpError');
        return;
      }

      // It should not get here
      expect(false).to.be.true;
    });

    it('throws SonosError on faulty input', async () => {
      TestHelpers.mockSoapError('/MediaRenderer/AVTransport/Control',
        '"urn:schemas-upnp-org:service:AVTransport:1#Play"',
        '<u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>2</InstanceID><Speed>bla</Speed></u:Play>',
        718);
      const service = new AVTransportService(TestHelpers.testHost, 1400);
      try {
        await service.Play({ InstanceID: 2, Speed: 'bla' });
      } catch (error) {
        expect(error).to.have.property('Action', 'Play');
        expect(error).to.have.property('FaultCode', 's:Client');
        expect(error).to.have.property('Fault', 'UPnPError');
        expect(error).to.have.property('name', 'SonosError');
        expect(error).to.have.property('UpnpErrorCode', 718);
        return;
      }

      // It should not get here
      expect(false).to.be.true;
    });

    it('works', async () => {
      TestHelpers.mockRequest('/MediaRenderer/AVTransport/Control',
        '"urn:schemas-upnp-org:service:AVTransport:1#Play"',
        '<u:Play xmlns:u="urn:schemas-upnp-org:service:AVTransport:1"><InstanceID>0</InstanceID><Speed>1</Speed></u:Play>',
        'PlayResponse',
        'AVTransport');
      const service = new AVTransportService(TestHelpers.testHost, 1400);

      const result = await service.Play({ InstanceID: 0, Speed: '1' });
      expect(result).to.be.eq(true);
    });
  });
});
