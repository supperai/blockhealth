import { encode, decode, isMNID } from '../index'

describe('encode', () => {
  it('main-net', () => {
    expect(encode({
      network: '0x1',
      address: '0x00521965e7bd230323c423d96c657db5b79d099f'
    })).toEqual('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')
  })

  it('with genesis hash', () => {
    expect(encode({
      network: '0x94365e3a',
      address: '0x00521965e7bd230323c423d96c657db5b79d099f'
    })).toEqual('5A8bRWU3F7j3REx3vkJWxdjQPp4tqmxFPmab1Tr')
  })

  it('ropsten', () => {
    expect(encode({
      network: '0x3',
      address: '0x00521965e7bd230323c423d96c657db5b79d099f'
    })).toEqual('2oDZvNUgn77w2BKTkd9qKpMeUo8EL94QL5V')
  })

  it('kovan', () => {
    expect(encode({
      network: '0x2a', 
      address: '0x00521965e7bd230323c423d96c657db5b79d099f'
    })).toEqual('34ukSmiK1oA1C5Du8aWpkjFGALoH7nsHeDX')
  })

  it('infuranet', () => {
    expect(encode({
      network: '0x16b2',
      address: '0x00521965e7bd230323c423d96c657db5b79d099f'
    })).toEqual('9Xy8yQpdeCNSPGQ9jwTha9MRSb2QJ8HYzf1u')
  })
})

describe('decode', () => {
  it('main-net', () => {
    expect(decode('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toEqual(
      {
        network: '0x1',
        address: '0x00521965e7bd230323c423d96c657db5b79d099f'
      }
    )
  })

  it('bad checksum', () => {
    expect(() => {
      decode('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqU')
    }).toThrow('Invalid address checksum')
  })

  it('with genesis hash', () => {
    expect(decode('5A8bRWU3F7j3REx3vkJWxdjQPp4tqmxFPmab1Tr')).toEqual(
      {
        network: '0x94365e3a',
        address: '0x00521965e7bd230323c423d96c657db5b79d099f'
      }
    )
  })

  it('ropsten', () => {
    expect(decode('2oDZvNUgn77w2BKTkd9qKpMeUo8EL94QL5V')).toEqual(
      {
        network: '0x3',
        address: '0x00521965e7bd230323c423d96c657db5b79d099f'
      }
    )
  })

  it('kovan', () => {
    expect(decode('34ukSmiK1oA1C5Du8aWpkjFGALoH7nsHeDX')).toEqual(
      {
        network: '0x2a',
        address: '0x00521965e7bd230323c423d96c657db5b79d099f'
      }
    )
  })
})

describe('isMNID', () => {
  it('is valid', () => {
    expect(isMNID('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX')).toBeTruthy()
    expect(isMNID('5A8bRWU3F7j3REx3vkJWxdjQPp4tqmxFPmab1Tr')).toBeTruthy()
    expect(isMNID('2oDZvNUgn77w2BKTkd9qKpMeUo8EL94QL5V')).toBeTruthy()
    expect(isMNID('34ukSmiK1oA1C5Du8aWpkjFGALoH7nsHeDX')).toBeTruthy()
    // bad checksum but still MNID
    expect(isMNID('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqU')).toBeTruthy()
  })

  it('is invalid', () => {
    // Ethereum Hex
    expect(isMNID('0x00521965e7bd230323c423d96c657db5b79d099f')).toBeFalsy()
    // Bitcoin
    expect(isMNID('1GbVUSW5WJmRCpaCJ4hanUny77oDaWW4to')).toBeFalsy()

    // IPFS
    expect(isMNID('QmXuNqXmrkxs4WhTDC2GCnXEep4LUD87bu97LQMn1rkxmQ')).toBeFalsy()

    // Cut off
    expect(isMNID('2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkq')).toBeFalsy()

    expect(isMNID('')).toBeFalsy()
    expect(isMNID(null)).toBeFalsy()
  })

})