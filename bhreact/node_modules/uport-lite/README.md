# Light weight library for fetching public uPort profiles

A uPort is an ethereum address representing an identity of a person, thing or other entitity. We are using the [MNID address encoding](https://github.com/uport-project/mnid) scheme to safely support multiple networks.

A public profile is stored on ipfs at a hash registered in the [uPortRegistry](https://github.com/ConsenSys/uport-registry).

This library aims to let developers look up a profile for a given ethereum address and nothing else. It is designed to be tiny,
so you can easily add uport functionality to non Ethereum apps.

## Use

By default it uses the uport registry on the `ropsten` network as well as infura ipfs and jsonRpc gateways.

```javascript
import UportLite from 'uport-lite'

// UportLite is just a function returning a function. It is not a Class so don't use `new`
const registry = UportLite()

registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
  console.log(profile)
})
```

You can configure it passing options to the function:

```javascript
import UportLite from 'uport-lite'

const registry = UportLite({
  ipfsGw: 'https://ipfs.infura.io/ipfs/',
  infuraKey: 'INFURA_API_KEY',
  networks: {
    '0x94365e3b': {
      rpcUrl: 'https://private.chain/rpc',
      address: '0x0101....'
    }
  }
})

registry('5A8bRWU3F7j3REx3vkJWxdjQPp4tqmxFPmab1Tr', (error, profile) => {
  console.log(profile)
})
```
