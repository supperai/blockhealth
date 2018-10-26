import UportLite from '../index'
const registry = UportLite({
  networks: {
    '0x94365e3b': {
      registry: '0x41566e3a081f5032bdcad470adb797635ddfe1f0',
      rpcUrl: 'https://ropsten.infura.io'
    }
  }
})

// uPortProfileIPFS1220 => 75506f727450726f66696c654950465331323230
//"uPortProfileIPFS1220","0x39F79c6511940bB54Ca69a659c929DdD5a4c679F","0x39F79c6511940bB54Ca69a659c929DdD5a4c679F"

it('finds valid default profile for address', () => {
  return new Promise((resolve, reject) => {
    registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).then(profile => {
    return expect(profile.publicKey).toEqual('0x0482780d59037778ea03c7d5169dd7cf47a835cb6d57a606b4e6cf98000a28d20d6d6bfae223cc76fd2f63d8a382a1c054788c4fafb1062ee89e718b96e0896d40')
  })
})

it('finds valid default profile for address on kovan', () => {
  return new Promise((resolve, reject) => {
    registry('3511FZbtXjJbTHYz3NnLAXZwjgFVQq3tCfH', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).then(profile => {
    return expect(profile.publicKey).toEqual('0x0466aa9f309dfb7624ae3b0a6b6ad6163145d977e088679252289816b90b2e5e9d58ea42a4b79f255731660d0c3e319a4fa54a6f1a73a88fd3c1b48a084269ab48')
  })
})

it('finds valid default profile on private chain', () => {
  return new Promise((resolve, reject) => {

    registry('5A8bRX9ShMLm7bXPn9SVX6hC7SG1HURF3tknToB', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).then(profile => {
    return expect(profile.publicKey).toEqual('0x0482780d59037778ea03c7d5169dd7cf47a835cb6d57a606b4e6cf98000a28d20d6d6bfae223cc76fd2f63d8a382a1c054788c4fafb1062ee89e718b96e0896d40')
  })
})

it('finds valid advanced profile using new API', () => {
  return new Promise((resolve, reject) => {

    registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    }, '2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', 'uPortProfileIPFS1220')
  }).then(profile => {
    return expect(profile.publicKey).toEqual('0x0482780d59037778ea03c7d5169dd7cf47a835cb6d57a606b4e6cf98000a28d20d6d6bfae223cc76fd2f63d8a382a1c054788c4fafb1062ee89e718b96e0896d40')
  })
})

it('returns null if it profile doesnt exist', () => {
  return new Promise((resolve, reject) => {
    registry('2oJvyeFwEbtLsuJ7G7bcUFPocuEU8AdeHKs', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).then(profile => {
    return expect(profile).toBeUndefined()
  })
})

it('returns error for unsupported network', () => {
  return new Promise((resolve, reject) => {
    registry('5A8bRWU3F7j3REx3vkJWxdjQPp4tqmxFPmab1Tr', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    })
  }).catch(error => {
    return expect(error.message).toBe('Network id 0x94365e3a is not configured')
  })
})

it('returns error if issuer and subject are on different networks', () => {
  return new Promise((resolve, reject) => {
    registry('2oVdmcz7BkWozm2JE4hHixRV8s5y3STqhPG', (error, profile) => {
      if (error) return reject(error)
      resolve(profile)
    }, '2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX', 'uPortProfileIPFS1220')
  }).catch(error => {
    return expect(error.message).toBe('Issuer and subject must be on the same network')
  })
})

describe('legacy registry', () => {
  it('finds valid profile', () => {
    return new Promise((resolve, reject) => {
      registry('0x3b2631d8e15b145fd2bf99fc5f98346aecdc394c', (error, profile) => {
        if (error) return reject(error)
        resolve(profile)
      })
    }).then(profile => {
      return expect(profile.publicKey).toEqual('0x0482780d59037778ea03c7d5169dd7cf47a835cb6d57a606b4e6cf98000a28d20d6d6bfae223cc76fd2f63d8a382a1c054788c4fafb1062ee89e718b96e0896d40')
    })
  })

  it('returns null if it profile doesnt exist', () => {
    return new Promise((resolve, reject) => {
      registry('0x3b2631d8e15b145fd2bf99fc5f98346aecdc394d', (error, profile) => {
        if (error) return reject(error)
        resolve(profile)
      })
    }).then(profile => {
      return expect(profile).toBeUndefined()
    })
  })
})
