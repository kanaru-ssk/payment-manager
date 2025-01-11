/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.19.4
 * source: google/cloud/identitytoolkit/v2/account_management_service.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./../../../api/annotations";
import * as dependency_2 from "./../../../api/client";
import * as dependency_3 from "./../../../api/field_behavior";
import * as dependency_4 from "./mfa_info";
import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export namespace google.cloud.identitytoolkit.v2 {
    export class FinalizeMfaEnrollmentRequest extends pb_1.Message {
        #one_of_decls: number[][] = [[4]];
        constructor(data?: any[] | ({
            id_token?: string;
            display_name?: string;
            tenant_id?: string;
        } & (({
            phone_verification_info?: dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id_token" in data && data.id_token != undefined) {
                    this.id_token = data.id_token;
                }
                if ("display_name" in data && data.display_name != undefined) {
                    this.display_name = data.display_name;
                }
                if ("phone_verification_info" in data && data.phone_verification_info != undefined) {
                    this.phone_verification_info = data.phone_verification_info;
                }
                if ("tenant_id" in data && data.tenant_id != undefined) {
                    this.tenant_id = data.tenant_id;
                }
            }
        }
        get id_token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set id_token(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get display_name() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set display_name(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get phone_verification_info() {
            return pb_1.Message.getWrapperField(this, dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo, 4) as dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo;
        }
        set phone_verification_info(value: dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo) {
            pb_1.Message.setOneofWrapperField(this, 4, this.#one_of_decls[0], value);
        }
        get has_phone_verification_info() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get tenant_id() {
            return pb_1.Message.getFieldWithDefault(this, 5, "") as string;
        }
        set tenant_id(value: string) {
            pb_1.Message.setField(this, 5, value);
        }
        get verification_info() {
            const cases: {
                [index: number]: "none" | "phone_verification_info";
            } = {
                0: "none",
                4: "phone_verification_info"
            };
            return cases[pb_1.Message.computeOneofCase(this, [4])];
        }
        static fromObject(data: {
            id_token?: string;
            display_name?: string;
            phone_verification_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo.prototype.toObject>;
            tenant_id?: string;
        }): FinalizeMfaEnrollmentRequest {
            const message = new FinalizeMfaEnrollmentRequest({});
            if (data.id_token != null) {
                message.id_token = data.id_token;
            }
            if (data.display_name != null) {
                message.display_name = data.display_name;
            }
            if (data.phone_verification_info != null) {
                message.phone_verification_info = dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo.fromObject(data.phone_verification_info);
            }
            if (data.tenant_id != null) {
                message.tenant_id = data.tenant_id;
            }
            return message;
        }
        toObject() {
            const data: {
                id_token?: string;
                display_name?: string;
                phone_verification_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo.prototype.toObject>;
                tenant_id?: string;
            } = {};
            if (this.id_token != null) {
                data.id_token = this.id_token;
            }
            if (this.display_name != null) {
                data.display_name = this.display_name;
            }
            if (this.phone_verification_info != null) {
                data.phone_verification_info = this.phone_verification_info.toObject();
            }
            if (this.tenant_id != null) {
                data.tenant_id = this.tenant_id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id_token.length)
                writer.writeString(1, this.id_token);
            if (this.display_name.length)
                writer.writeString(3, this.display_name);
            if (this.has_phone_verification_info)
                writer.writeMessage(4, this.phone_verification_info, () => this.phone_verification_info.serialize(writer));
            if (this.tenant_id.length)
                writer.writeString(5, this.tenant_id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FinalizeMfaEnrollmentRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FinalizeMfaEnrollmentRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id_token = reader.readString();
                        break;
                    case 3:
                        message.display_name = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.phone_verification_info, () => message.phone_verification_info = dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneRequestInfo.deserialize(reader));
                        break;
                    case 5:
                        message.tenant_id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): FinalizeMfaEnrollmentRequest {
            return FinalizeMfaEnrollmentRequest.deserialize(bytes);
        }
    }
    export class FinalizeMfaEnrollmentResponse extends pb_1.Message {
        #one_of_decls: number[][] = [[3]];
        constructor(data?: any[] | ({
            id_token?: string;
            refresh_token?: string;
        } & (({
            phone_auth_info?: dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id_token" in data && data.id_token != undefined) {
                    this.id_token = data.id_token;
                }
                if ("refresh_token" in data && data.refresh_token != undefined) {
                    this.refresh_token = data.refresh_token;
                }
                if ("phone_auth_info" in data && data.phone_auth_info != undefined) {
                    this.phone_auth_info = data.phone_auth_info;
                }
            }
        }
        get id_token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set id_token(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get refresh_token() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set refresh_token(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get phone_auth_info() {
            return pb_1.Message.getWrapperField(this, dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo, 3) as dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo;
        }
        set phone_auth_info(value: dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo) {
            pb_1.Message.setOneofWrapperField(this, 3, this.#one_of_decls[0], value);
        }
        get has_phone_auth_info() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get auxiliary_auth_info() {
            const cases: {
                [index: number]: "none" | "phone_auth_info";
            } = {
                0: "none",
                3: "phone_auth_info"
            };
            return cases[pb_1.Message.computeOneofCase(this, [3])];
        }
        static fromObject(data: {
            id_token?: string;
            refresh_token?: string;
            phone_auth_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo.prototype.toObject>;
        }): FinalizeMfaEnrollmentResponse {
            const message = new FinalizeMfaEnrollmentResponse({});
            if (data.id_token != null) {
                message.id_token = data.id_token;
            }
            if (data.refresh_token != null) {
                message.refresh_token = data.refresh_token;
            }
            if (data.phone_auth_info != null) {
                message.phone_auth_info = dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo.fromObject(data.phone_auth_info);
            }
            return message;
        }
        toObject() {
            const data: {
                id_token?: string;
                refresh_token?: string;
                phone_auth_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo.prototype.toObject>;
            } = {};
            if (this.id_token != null) {
                data.id_token = this.id_token;
            }
            if (this.refresh_token != null) {
                data.refresh_token = this.refresh_token;
            }
            if (this.phone_auth_info != null) {
                data.phone_auth_info = this.phone_auth_info.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id_token.length)
                writer.writeString(1, this.id_token);
            if (this.refresh_token.length)
                writer.writeString(2, this.refresh_token);
            if (this.has_phone_auth_info)
                writer.writeMessage(3, this.phone_auth_info, () => this.phone_auth_info.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FinalizeMfaEnrollmentResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FinalizeMfaEnrollmentResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id_token = reader.readString();
                        break;
                    case 2:
                        message.refresh_token = reader.readString();
                        break;
                    case 3:
                        reader.readMessage(message.phone_auth_info, () => message.phone_auth_info = dependency_4.google.cloud.identitytoolkit.v2.FinalizeMfaPhoneResponseInfo.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): FinalizeMfaEnrollmentResponse {
            return FinalizeMfaEnrollmentResponse.deserialize(bytes);
        }
    }
    export class StartMfaEnrollmentRequest extends pb_1.Message {
        #one_of_decls: number[][] = [[3]];
        constructor(data?: any[] | ({
            id_token?: string;
            tenant_id?: string;
        } & (({
            phone_enrollment_info?: dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id_token" in data && data.id_token != undefined) {
                    this.id_token = data.id_token;
                }
                if ("phone_enrollment_info" in data && data.phone_enrollment_info != undefined) {
                    this.phone_enrollment_info = data.phone_enrollment_info;
                }
                if ("tenant_id" in data && data.tenant_id != undefined) {
                    this.tenant_id = data.tenant_id;
                }
            }
        }
        get id_token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set id_token(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get phone_enrollment_info() {
            return pb_1.Message.getWrapperField(this, dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo, 3) as dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo;
        }
        set phone_enrollment_info(value: dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo) {
            pb_1.Message.setOneofWrapperField(this, 3, this.#one_of_decls[0], value);
        }
        get has_phone_enrollment_info() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get tenant_id() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set tenant_id(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        get enrollment_info() {
            const cases: {
                [index: number]: "none" | "phone_enrollment_info";
            } = {
                0: "none",
                3: "phone_enrollment_info"
            };
            return cases[pb_1.Message.computeOneofCase(this, [3])];
        }
        static fromObject(data: {
            id_token?: string;
            phone_enrollment_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo.prototype.toObject>;
            tenant_id?: string;
        }): StartMfaEnrollmentRequest {
            const message = new StartMfaEnrollmentRequest({});
            if (data.id_token != null) {
                message.id_token = data.id_token;
            }
            if (data.phone_enrollment_info != null) {
                message.phone_enrollment_info = dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo.fromObject(data.phone_enrollment_info);
            }
            if (data.tenant_id != null) {
                message.tenant_id = data.tenant_id;
            }
            return message;
        }
        toObject() {
            const data: {
                id_token?: string;
                phone_enrollment_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo.prototype.toObject>;
                tenant_id?: string;
            } = {};
            if (this.id_token != null) {
                data.id_token = this.id_token;
            }
            if (this.phone_enrollment_info != null) {
                data.phone_enrollment_info = this.phone_enrollment_info.toObject();
            }
            if (this.tenant_id != null) {
                data.tenant_id = this.tenant_id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id_token.length)
                writer.writeString(1, this.id_token);
            if (this.has_phone_enrollment_info)
                writer.writeMessage(3, this.phone_enrollment_info, () => this.phone_enrollment_info.serialize(writer));
            if (this.tenant_id.length)
                writer.writeString(4, this.tenant_id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StartMfaEnrollmentRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StartMfaEnrollmentRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id_token = reader.readString();
                        break;
                    case 3:
                        reader.readMessage(message.phone_enrollment_info, () => message.phone_enrollment_info = dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneRequestInfo.deserialize(reader));
                        break;
                    case 4:
                        message.tenant_id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): StartMfaEnrollmentRequest {
            return StartMfaEnrollmentRequest.deserialize(bytes);
        }
    }
    export class StartMfaEnrollmentResponse extends pb_1.Message {
        #one_of_decls: number[][] = [[1]];
        constructor(data?: any[] | ({} & (({
            phone_session_info?: dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("phone_session_info" in data && data.phone_session_info != undefined) {
                    this.phone_session_info = data.phone_session_info;
                }
            }
        }
        get phone_session_info() {
            return pb_1.Message.getWrapperField(this, dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo, 1) as dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo;
        }
        set phone_session_info(value: dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo) {
            pb_1.Message.setOneofWrapperField(this, 1, this.#one_of_decls[0], value);
        }
        get has_phone_session_info() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get enrollment_response() {
            const cases: {
                [index: number]: "none" | "phone_session_info";
            } = {
                0: "none",
                1: "phone_session_info"
            };
            return cases[pb_1.Message.computeOneofCase(this, [1])];
        }
        static fromObject(data: {
            phone_session_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo.prototype.toObject>;
        }): StartMfaEnrollmentResponse {
            const message = new StartMfaEnrollmentResponse({});
            if (data.phone_session_info != null) {
                message.phone_session_info = dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo.fromObject(data.phone_session_info);
            }
            return message;
        }
        toObject() {
            const data: {
                phone_session_info?: ReturnType<typeof dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo.prototype.toObject>;
            } = {};
            if (this.phone_session_info != null) {
                data.phone_session_info = this.phone_session_info.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_phone_session_info)
                writer.writeMessage(1, this.phone_session_info, () => this.phone_session_info.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StartMfaEnrollmentResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StartMfaEnrollmentResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.phone_session_info, () => message.phone_session_info = dependency_4.google.cloud.identitytoolkit.v2.StartMfaPhoneResponseInfo.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): StartMfaEnrollmentResponse {
            return StartMfaEnrollmentResponse.deserialize(bytes);
        }
    }
    export class WithdrawMfaRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            id_token?: string;
            mfa_enrollment_id?: string;
            tenant_id?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id_token" in data && data.id_token != undefined) {
                    this.id_token = data.id_token;
                }
                if ("mfa_enrollment_id" in data && data.mfa_enrollment_id != undefined) {
                    this.mfa_enrollment_id = data.mfa_enrollment_id;
                }
                if ("tenant_id" in data && data.tenant_id != undefined) {
                    this.tenant_id = data.tenant_id;
                }
            }
        }
        get id_token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set id_token(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get mfa_enrollment_id() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set mfa_enrollment_id(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get tenant_id() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set tenant_id(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data: {
            id_token?: string;
            mfa_enrollment_id?: string;
            tenant_id?: string;
        }): WithdrawMfaRequest {
            const message = new WithdrawMfaRequest({});
            if (data.id_token != null) {
                message.id_token = data.id_token;
            }
            if (data.mfa_enrollment_id != null) {
                message.mfa_enrollment_id = data.mfa_enrollment_id;
            }
            if (data.tenant_id != null) {
                message.tenant_id = data.tenant_id;
            }
            return message;
        }
        toObject() {
            const data: {
                id_token?: string;
                mfa_enrollment_id?: string;
                tenant_id?: string;
            } = {};
            if (this.id_token != null) {
                data.id_token = this.id_token;
            }
            if (this.mfa_enrollment_id != null) {
                data.mfa_enrollment_id = this.mfa_enrollment_id;
            }
            if (this.tenant_id != null) {
                data.tenant_id = this.tenant_id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id_token.length)
                writer.writeString(1, this.id_token);
            if (this.mfa_enrollment_id.length)
                writer.writeString(2, this.mfa_enrollment_id);
            if (this.tenant_id.length)
                writer.writeString(3, this.tenant_id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WithdrawMfaRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new WithdrawMfaRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id_token = reader.readString();
                        break;
                    case 2:
                        message.mfa_enrollment_id = reader.readString();
                        break;
                    case 3:
                        message.tenant_id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): WithdrawMfaRequest {
            return WithdrawMfaRequest.deserialize(bytes);
        }
    }
    export class WithdrawMfaResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            id_token?: string;
            refresh_token?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id_token" in data && data.id_token != undefined) {
                    this.id_token = data.id_token;
                }
                if ("refresh_token" in data && data.refresh_token != undefined) {
                    this.refresh_token = data.refresh_token;
                }
            }
        }
        get id_token() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set id_token(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get refresh_token() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set refresh_token(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: {
            id_token?: string;
            refresh_token?: string;
        }): WithdrawMfaResponse {
            const message = new WithdrawMfaResponse({});
            if (data.id_token != null) {
                message.id_token = data.id_token;
            }
            if (data.refresh_token != null) {
                message.refresh_token = data.refresh_token;
            }
            return message;
        }
        toObject() {
            const data: {
                id_token?: string;
                refresh_token?: string;
            } = {};
            if (this.id_token != null) {
                data.id_token = this.id_token;
            }
            if (this.refresh_token != null) {
                data.refresh_token = this.refresh_token;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id_token.length)
                writer.writeString(1, this.id_token);
            if (this.refresh_token.length)
                writer.writeString(2, this.refresh_token);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WithdrawMfaResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new WithdrawMfaResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id_token = reader.readString();
                        break;
                    case 2:
                        message.refresh_token = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): WithdrawMfaResponse {
            return WithdrawMfaResponse.deserialize(bytes);
        }
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    interface GrpcStreamServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
        (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    }
    interface GrpWritableServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
        (callback: grpc_1.requestCallback<R>): grpc_1.ClientWritableStream<P>;
    }
    interface GrpcChunkServiceInterface<P, R> {
        (metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
        (options?: grpc_1.CallOptions): grpc_1.ClientDuplexStream<P, R>;
    }
    interface GrpcPromiseServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): Promise<R>;
        (message: P, options?: grpc_1.CallOptions): Promise<R>;
    }
    export abstract class UnimplementedAccountManagementServiceService {
        static definition = {
            FinalizeMfaEnrollment: {
                path: "/google.cloud.identitytoolkit.v2.AccountManagementService/FinalizeMfaEnrollment",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: FinalizeMfaEnrollmentRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => FinalizeMfaEnrollmentRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: FinalizeMfaEnrollmentResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => FinalizeMfaEnrollmentResponse.deserialize(new Uint8Array(bytes))
            },
            StartMfaEnrollment: {
                path: "/google.cloud.identitytoolkit.v2.AccountManagementService/StartMfaEnrollment",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: StartMfaEnrollmentRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => StartMfaEnrollmentRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: StartMfaEnrollmentResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => StartMfaEnrollmentResponse.deserialize(new Uint8Array(bytes))
            },
            WithdrawMfa: {
                path: "/google.cloud.identitytoolkit.v2.AccountManagementService/WithdrawMfa",
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: WithdrawMfaRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => WithdrawMfaRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: WithdrawMfaResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => WithdrawMfaResponse.deserialize(new Uint8Array(bytes))
            }
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract FinalizeMfaEnrollment(call: grpc_1.ServerUnaryCall<FinalizeMfaEnrollmentRequest, FinalizeMfaEnrollmentResponse>, callback: grpc_1.sendUnaryData<FinalizeMfaEnrollmentResponse>): void;
        abstract StartMfaEnrollment(call: grpc_1.ServerUnaryCall<StartMfaEnrollmentRequest, StartMfaEnrollmentResponse>, callback: grpc_1.sendUnaryData<StartMfaEnrollmentResponse>): void;
        abstract WithdrawMfa(call: grpc_1.ServerUnaryCall<WithdrawMfaRequest, WithdrawMfaResponse>, callback: grpc_1.sendUnaryData<WithdrawMfaResponse>): void;
    }
    export class AccountManagementServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedAccountManagementServiceService.definition, "AccountManagementService", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
            super(address, credentials, options);
        }
        FinalizeMfaEnrollment: GrpcUnaryServiceInterface<FinalizeMfaEnrollmentRequest, FinalizeMfaEnrollmentResponse> = (message: FinalizeMfaEnrollmentRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<FinalizeMfaEnrollmentResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<FinalizeMfaEnrollmentResponse>, callback?: grpc_1.requestCallback<FinalizeMfaEnrollmentResponse>): grpc_1.ClientUnaryCall => {
            return super.FinalizeMfaEnrollment(message, metadata, options, callback);
        };
        StartMfaEnrollment: GrpcUnaryServiceInterface<StartMfaEnrollmentRequest, StartMfaEnrollmentResponse> = (message: StartMfaEnrollmentRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<StartMfaEnrollmentResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<StartMfaEnrollmentResponse>, callback?: grpc_1.requestCallback<StartMfaEnrollmentResponse>): grpc_1.ClientUnaryCall => {
            return super.StartMfaEnrollment(message, metadata, options, callback);
        };
        WithdrawMfa: GrpcUnaryServiceInterface<WithdrawMfaRequest, WithdrawMfaResponse> = (message: WithdrawMfaRequest, metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<WithdrawMfaResponse>, options?: grpc_1.CallOptions | grpc_1.requestCallback<WithdrawMfaResponse>, callback?: grpc_1.requestCallback<WithdrawMfaResponse>): grpc_1.ClientUnaryCall => {
            return super.WithdrawMfa(message, metadata, options, callback);
        };
    }
}