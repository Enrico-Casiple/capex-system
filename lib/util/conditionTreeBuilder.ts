type ConditionValue = {
  nodeType: 'RULE' | 'GROUP';
  logicalOperator?: string;
  field?: string;
  operator?: string;
  value?: unknown;
};

type Condition = {
  modelName: string;
  group: string;
  codeKey: string;
  code: string;
  codeLabel: string;
  value: ConditionValue;
};

type ConditionNode = {
  type: 'GROUP' | 'RULE';
  operator?: 'AND' | 'OR';
  field?: string;
  comparison?: string;
  value?: unknown;
  children?: ConditionNode[];
};

export function buildConditionTree(conditions: Condition[]): ConditionNode | null {
  if (!conditions || conditions.length === 0) return null;

  const nodes: ConditionNode[] = [];
  let currentGroup: ConditionNode | null = null;

  for (const condition of conditions) {
    const value = condition.value;

    if (value.nodeType === 'GROUP') {
      // Finalize previous group if exists
      if (currentGroup && currentGroup.children && currentGroup.children.length > 0) {
        nodes.push(currentGroup);
      }
      // Start new group
      currentGroup = {
        type: 'GROUP',
        operator: (value.logicalOperator as 'AND' | 'OR') || 'AND',
        children: []
      };
    } else if (value.nodeType === 'RULE') {
      const ruleNode: ConditionNode = {
        type: 'RULE',
        field: value.field as string,
        comparison: value.operator as string,
        value: value.value
      };

      if (currentGroup) {
        // Add to current group
        currentGroup.children!.push(ruleNode);
      } else {
        // Standalone rule (no grouping)
        nodes.push(ruleNode);
      }
    }
  }

  // Push remaining group
  if (currentGroup && currentGroup.children && currentGroup.children.length > 0) {
    nodes.push(currentGroup);
  }

  // If only one node, return it directly
  if (nodes.length === 1) {
    return nodes[0];
  }

  // If multiple nodes, wrap in AND group
  if (nodes.length > 1) {
    return {
      type: 'GROUP',
      operator: 'AND',
      children: nodes
    };
  }

  return null;
}

type EvaluationResult = {
  result: boolean;
  matchedConditions: string[];
  failedConditions: string[];
  message: string;
};

export function evaluateCondition(node: ConditionNode | null, data: Record<string, unknown>): boolean {
  const evaluation = evaluateConditionWithDetails(node, data);
  return evaluation.result;
}

export function evaluateConditionWithDetails(
  node: ConditionNode | null,
  data: Record<string, unknown>,
  path: string = 'root'
): EvaluationResult {
  if (!node) {
    return {
      result: true,
      matchedConditions: [],
      failedConditions: [],
      message: 'No conditions to evaluate'
    };
  }

  if (node.type === 'RULE') {
    const fieldValue = data[node.field!];
    const compareValue = node.value;
    const conditionDesc = `${node.field} ${node.comparison} ${compareValue}`;
    let result = false;

    switch (node.comparison) {
      case '===':
      case '==':
        result = fieldValue == compareValue;
        break;
      case '!==':
      case '!=':
        result = fieldValue != compareValue;
        break;
      case '>':
        result = Number(fieldValue) > Number(compareValue);
        break;
      case '>=':
        result = Number(fieldValue) >= Number(compareValue);
        break;
      case '<':
        result = Number(fieldValue) < Number(compareValue);
        break;
      case '<=':
        result = Number(fieldValue) <= Number(compareValue);
        break;
      case 'contains':
        result = String(fieldValue).toLowerCase().includes(String(compareValue).toLowerCase());
        break;
      case 'startsWith':
        result = String(fieldValue).toLowerCase().startsWith(String(compareValue).toLowerCase());
        break;
      case 'endsWith':
        result = String(fieldValue).toLowerCase().endsWith(String(compareValue).toLowerCase());
        break;
      default:
        result = false;
    }

    const message = result
      ? `✓ Condition met: ${conditionDesc} (actual value: ${fieldValue})`
      : `✗ Condition failed: ${conditionDesc} (actual value: ${fieldValue})`;

    return {
      result,
      matchedConditions: result ? [conditionDesc] : [],
      failedConditions: result ? [] : [conditionDesc],
      message
    };
  }

  if (node.type === 'GROUP' && node.children) {
    const childResults = node.children.map((child, index) =>
      evaluateConditionWithDetails(child, data, `${path}.${index}`)
    );

    const allMatched: string[] = [];
    const allFailed: string[] = [];

    childResults.forEach(r => {
      allMatched.push(...r.matchedConditions);
      allFailed.push(...r.failedConditions);
    });

    let result: boolean;
    if (node.operator === 'OR') {
      result = childResults.some(r => r.result === true);
    } else {
      // Default to AND
      result = childResults.every(r => r.result === true);
    }

    const operator = node.operator || 'AND';
    const totalConditions = allMatched.length + allFailed.length;
    const message = result
      ? `✓ All conditions passed (${operator}): ${allMatched.length}/${totalConditions} conditions met`
      : `✗ Conditions failed (${operator}): ${allMatched.length}/${totalConditions} conditions met, ${allFailed.length} failed`;

    return {
      result,
      matchedConditions: allMatched,
      failedConditions: allFailed,
      message
    };
  }

  return {
    result: false,
    matchedConditions: [],
    failedConditions: [],
    message: '✗ Invalid condition node'
  };
}
