---
layout: default
title: MusicServicesService
parent: Services
grand_parent: Sonos device
---
# MusicServicesService
{: .no_toc }

External music services

The MusicServicesService is available on these models: `v1-S1` / `v1-S5` / `v1-S9`.

```js
const SonosDevice = require('@svrooij/sonos').SonosDevice
const sonos = new SonosDevice('192.168.x.x')
sonos.MusicServicesService.OneOfTheMethodsBelow({...})
```

All methods that require input expect an object with the specified parameters, even if it only requires one parameter.

1. TOC
{:toc}

---

### GetSessionId

Input:

| parameter | type | description |
|:----------|:-----|:------------|
| **ServiceId** | `number` |  |
| **Username** | `string` |  |

Output:

| parameter | type | description |
|:----------|:-----|:------------|
| **SessionId** | `string` |  |

### ListAvailableServices

Load music service list (xml), see ListAndParseAvailableServices() for parsed version.

No input parameters

Output:

| parameter | type | description |
|:----------|:-----|:------------|
| **AvailableServiceDescriptorList** | `string` |  |
| **AvailableServiceTypeList** | `string` |  |
| **AvailableServiceListVersion** | `string` |  |

### UpdateAvailableServices

No input parameters

## MusicServicesService event

```js
const SonosDevice = require('@svrooij/sonos').SonosDevice
const sonos = new SonosDevice('192.168.x.x')
sonos.MusicServicesService.Events('serviceEvent', (data) => {
  console.log(data);
});
```

The **MusicServicesService** emits events with these properties. Not all properties are emitted every time.

| parameter | type | possible values |
|:----------|:-----|:----------------|
| **ServiceId** | `number` |  | 
| **ServiceListVersion** | `string` |  | 
| **SessionId** | `string` |  | 
| **Username** | `string` |  | 

This file is automatically generated with [@svrooij/sonos-docs](https://github.com/svrooij/sonos-api-docs/tree/main/generator/sonos-docs), do not edit manually.
