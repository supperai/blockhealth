package com.Computedemo;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.StaticArray3;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import rx.Observable;
import rx.functions.Func1;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 3.6.0.
 */
public class Compute_sol_Compute extends Contract {
    private static final String BINARY = "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061059e806100536000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806303e9e6091461006757806313af4035146100d05780638da5cb5b146101135780639c17139e1461016a575b600080fd5b34801561007357600080fd5b50610092600480360381019080803590602001909291905050506101b5565b6040518082600360200280838360005b838110156100bd5780820151818401526020810190506100a2565b5050505090500191505060405180910390f35b3480156100dc57600080fd5b50610111600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610278565b005b34801561011f57600080fd5b50610128610332565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561017657600080fd5b5061019f6004803603810190808035906020019092919080359060200190929190505050610357565b6040518082815260200191505060405180910390f35b6101bd6104ea565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561021857600080fd5b60018281548110151561022757fe5b906000526020600020906003020160038060200260405190810160405280929190826003801561026c576020028201915b815481526020019060010190808311610258575b50505050509050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102d357600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151561032f578073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a905050505b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103bb57600080fd5b868814156103cb578795506104bb565b6103d588886104c6565b8095508196505050600192505b6001156104ba578483029150600084838115156103fb57fe5b0614156104ad576001806060604051908101604052808b81526020018a8152602001858152509080600181540180825580915050906001820390600052602060002090600302016000909192909190915090600361045a92919061050d565b500390507ff5589a624e1de338d9c146d63b147fd840c26c11c6f85c0df9a298b13fb5be0b88888460405180848152602001838152602001828152602001935050505060405180910390a18095506104bb565b82806001019350506103e2565b5b505050505092915050565b600080828411156104dc578383915091506104e3565b8284915091505b9250929050565b606060405190810160405280600390602082028038833980820191505090505090565b826003810192821561053c579160200282015b8281111561053b578251825591602001919060010190610520565b5b509050610549919061054d565b5090565b61056f91905b8082111561056b576000816000905550600101610553565b5090565b905600a165627a7a72305820a8b8ed3dbe15f144bd13fe64fd9c9f6c7317f74a58548697341040dc682356fc0029";

    public static final String FUNC_GETRECORD = "getRecord";

    public static final String FUNC_SETOWNER = "setOwner";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_GETLCM = "getLCM";

    public static final Event GETLCM_EVENT = new Event("GetLCM", Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));

    @Deprecated
    protected Compute_sol_Compute(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Compute_sol_Compute(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Compute_sol_Compute(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Compute_sol_Compute(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteCall<StaticArray3<Uint256>> getRecord(Uint256 index) {
        final Function function = new Function(FUNC_GETRECORD, 
                Arrays.<Type>asList(index), 
                Arrays.<TypeReference<?>>asList(new TypeReference<StaticArray3<Uint256>>() {}));
        return executeRemoteCallSingleValueReturn(function);
    }

    public RemoteCall<TransactionReceipt> setOwner(Address to) {
        final Function function = new Function(
                FUNC_SETOWNER, 
                Arrays.<Type>asList(to), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteCall<Address> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function);
    }

    public RemoteCall<TransactionReceipt> getLCM(Uint256 first, Uint256 second) {
        final Function function = new Function(
                FUNC_GETLCM, 
                Arrays.<Type>asList(first, second), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public List<GetLCMEventResponse> getGetLCMEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(GETLCM_EVENT, transactionReceipt);
        ArrayList<GetLCMEventResponse> responses = new ArrayList<GetLCMEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            GetLCMEventResponse typedResponse = new GetLCMEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.first = (Uint256) eventValues.getNonIndexedValues().get(0);
            typedResponse.second = (Uint256) eventValues.getNonIndexedValues().get(1);
            typedResponse.result = (Uint256) eventValues.getNonIndexedValues().get(2);
            responses.add(typedResponse);
        }
        return responses;
    }

    public Observable<GetLCMEventResponse> getLCMEventObservable(EthFilter filter) {
        return web3j.ethLogObservable(filter).map(new Func1<Log, GetLCMEventResponse>() {
            @Override
            public GetLCMEventResponse call(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(GETLCM_EVENT, log);
                GetLCMEventResponse typedResponse = new GetLCMEventResponse();
                typedResponse.log = log;
                typedResponse.first = (Uint256) eventValues.getNonIndexedValues().get(0);
                typedResponse.second = (Uint256) eventValues.getNonIndexedValues().get(1);
                typedResponse.result = (Uint256) eventValues.getNonIndexedValues().get(2);
                return typedResponse;
            }
        });
    }

    public Observable<GetLCMEventResponse> getLCMEventObservable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(GETLCM_EVENT));
        return getLCMEventObservable(filter);
    }

    public static RemoteCall<Compute_sol_Compute> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Compute_sol_Compute.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Compute_sol_Compute> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Compute_sol_Compute.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<Compute_sol_Compute> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Compute_sol_Compute.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Compute_sol_Compute> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Compute_sol_Compute.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static Compute_sol_Compute load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Compute_sol_Compute(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Compute_sol_Compute load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Compute_sol_Compute(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Compute_sol_Compute load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Compute_sol_Compute(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Compute_sol_Compute load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Compute_sol_Compute(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class GetLCMEventResponse {
        public Log log;

        public Uint256 first;

        public Uint256 second;

        public Uint256 result;
    }
}
