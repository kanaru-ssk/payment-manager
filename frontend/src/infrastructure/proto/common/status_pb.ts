// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file common/status.proto (package common, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file common/status.proto.
 */
export const file_common_status: GenFile = /*@__PURE__*/
  fileDesc("ChNjb21tb24vc3RhdHVzLnByb3RvEgZjb21tb24iJwoGU3RhdHVzEgwKBGNvZGUYASABKAUSDwoHbWVzc2FnZRgCIAEoCUKXAQoKY29tLmNvbW1vbkILU3RhdHVzUHJvdG9QAVpEZ2l0aHViLmNvbS9rYW5hcnUtc3NrL3BheW1lbnQtbWFuYWdlci9iYWNrZW5kL2ludGVyZmFjZS9wcm90by9jb21tb26iAgNDWFiqAgZDb21tb27KAgZDb21tb27iAhJDb21tb25cR1BCTWV0YWRhdGHqAgZDb21tb25iBnByb3RvMw");

/**
 * @generated from message common.Status
 */
export type Status = Message<"common.Status"> & {
  /**
   * @generated from field: int32 code = 1;
   */
  code: number;

  /**
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message common.Status.
 * Use `create(StatusSchema)` to create a new message.
 */
export const StatusSchema: GenMessage<Status> = /*@__PURE__*/
  messageDesc(file_common_status, 0);

